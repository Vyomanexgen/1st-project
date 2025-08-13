import React, { useState, useEffect } from "react";
import styles from "./Audition.module.css";
import Layout from "../components/Layout.jsx";
import supabase from "../config/supabaseClient.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import eyeIcon from './admin/images/eye.png';
import eyeSlashIcon from './admin/images/eye-close.png';

const auditionRoles = [
  { title: "Story Writing", image: "/images/script-writing.jpg" },
  { title: "Screenplay Writing", image: "/images/Screen Play writing.jpeg" },
  { title: "Dialogue Writing", image: "/images/Dialogue Writing.jpeg" },
  { title: "Direction", image: "/images/direction.webp" },
  { title: "Cinematography", image: "/images/Cinematography.jpg" },
  { title: "Editing", image: "/images/Editing.webp" },
  { title: "Art Direction", image: "/images/Art Direction.jpeg" },
  { title: "Costume Design", image: "/images/Costume Design.webp" },
  { title: "Makeup", image: "/images/Makeup.webp" },
  { title: "Hairstyling", image: "/images/Hairstyling.jpg" },
  { title: "Choreography", image: "/images/Choreography.jpg" },
  { title: "Stunt Coordination", image: "/images/Stunt Coordination.jpg" },
  { title: "Acting", image: "/images/Acting.jpg" },
  { title: "Music Direction", image: "/images/Music Direction.jpg" },
  { title: "Background Score", image: "/images/Background Score.jpeg" },
  { title: "Lyrics Writing", image: "/images/Lyrics Writing.jpg" },
  { title: "Singing (Playback)", image: "/images/Singing (Playback).jpg" },
  { title: "Sound Recording", image: "/images/Sound Recording.webp" },
  { title: "Dubbing", image: "/images/Dubbing.jpg" },
  { title: "Sound Mixing", image: "/images/Sound Mixing.jpeg" },
  { title: "Set Design", image: "/images/Set Design.jpeg" },
  { title: "Lighting", image: "/images/Lighting.jpg" },
  { title: "Production Management", image: "/images/Production Management.jpeg" },
  { title: "Publicity & Promotion", image: "/images/Publicity & Promotion images for movie.jpeg" },
];

const Audition = () => {
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showTermsPopup, setShowTermsPopup] = useState(false);
  const [agreedToTermsInForm, setAgreedToTermsInForm] = useState(false);
  const [formOpen, setFormOpen] = useState(true);
  const [sectionStatus, setSectionStatus] = useState([]);
  const [isFlipped, setIsFlipped] = useState(true);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  //const [agreedToTermsInPopup, setAgreedToTermsInPopup] = useState(false);

 
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  
  useEffect(() => {
    const fetchStatus = async () => {
      const { data: formStatusData, error: formError } = await supabase
        .from('audition_form_status')
        .select('is_open')
        .eq('id', 1)
        .single();
      if (!formError) setFormOpen(formStatusData.is_open);

      const { data: sectionData, error: sectionError } = await supabase
        .from('audition_section_status')
        .select('*');
      if (!sectionError) setSectionStatus(sectionData);
    };
    fetchStatus();
  }, []);

  
  useEffect(() => {
    const channel = supabase.channel('audition-form-channel');

    channel
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'audition_form_status' },
        (payload) => setFormOpen(payload.new.is_open))
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'audition_section_status' },
        (payload) => {
          setSectionStatus(prev =>
            prev.map(section =>
              section.id === payload.new.id ? payload.new : section
            )
          );
        })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  
  const handleSignUp = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });

    if (error) toast.error("❌ Sign up failed: " + error.message);
    else toast.success("🎉 Please check your email to verify your account.");
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      if (error.message.includes("Email not confirmed")) {
        toast.error("❌ Please verify your email before signing in.");
      } else {
        toast.error("❌ Sign in failed: " + error.message);
      }
    } else {
      setUser(data.user);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

 
  const handleCardClick = (title) => {
    // const section = sectionStatus.find((s) => s.section_name === title);
    const section = sectionStatus.find(s => s.category === title);

    const isSectionOpen = section ? section.is_open : true;
    if (!formOpen) {
      toast.error("❌ The audition form is currently closed.");
      return;
    }
    if (!isSectionOpen) {
      toast.error(`❌ The ${title} section is currently closed.`);
      return;
    }
    setSelectedRole(title);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setSelectedRole("");
    setFormData({});
    setFiles({});
    setIsSubmitted(false);
    setShowTermsPopup(false);
    setAgreedToTermsInForm(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const uploadToStorage = async (file, prefix) => {
    if (!file) return null;
    const filePath = `${prefix}/${Date.now()}_${file.name}`;
    const { error } = await supabase.storage.from("images").upload(filePath, file);
    if (error) {
      console.error("Upload error:", error.message);
      return null;
    }
    const { publicUrl } = supabase.storage.from("images").getPublicUrl(filePath).data;
    return publicUrl;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const { data: sectionData, error: sectionError } = await supabase
    .from('audition_section_status')
    .select('is_open')
    .eq('category', selectedRole)
    .single();

  if (sectionError || !sectionData?.is_open) {
    toast.error(`❌ The ${selectedRole} section is currently closed.`);
    setIsSubmitting(false);
    return;
  }

  setIsSubmitting(true);


  const resumeUrl = await uploadToStorage(files.resume, "resumes");
  const headshotUrl = await uploadToStorage(files.head_shot_photo, "headshots");
  const fullBodyUrl = await uploadToStorage(files.full_body_photo, "fullbodies");
  const paymentScreenshotUrl = await uploadToStorage(files.payment_screenshot, "payments");
 
  if (files.full_body_photo && !fullBodyUrl) {
      toast.error("❌ Critical error: Failed to upload the full body photo. Please check your connection and try again.");
      setIsSubmitting(false);
      return; 
  }

 

  const rolePrefixes = {
    "Story Writing": "sw",
    "Screenplay Writing": "spw",
    "Dialogue Writing": "dw",
    "Direction": "di",
    "Cinematography": "cm",
    "Editing": "ed",
    "Art Direction": "ad",
    "Costume Design": "cd",
    "Makeup": "mu",
    "Hairstyling": "hs",
    "Choreography": "ch",
    "Stunt Coordination": "sc",
    "Acting": "ac",
    "Music Direction": "md",
    "Background Score": "bs",
    "Lyrics Writing": "ly",
    "Singing (Playback)": "sg",
    "Sound Recording": "sr",
    "Dubbing": "db",
    "Sound Mixing": "sm",
    "Set Design": "sd",
    "Lighting": "lt",
    "Production Management": "pm",
    "Publicity & Promotion": "pp",
  };
  const rolePrefix = rolePrefixes[selectedRole] || "xx";

  const { data: existingEntries, error: fetchError } = await supabase
    .from("Audition Form")
    .select("id")
    .eq("Categories", selectedRole);

  if (fetchError) {
    toast.error("❌ Failed to generate unique ID");
    setIsSubmitting(false);
    return;
  }

  const count = existingEntries?.length || 0;
  if (count >= 10000) {
    await supabase
      .from("audition_section_status")
      .update({ is_open: false })
      .eq("category", selectedRole);

    toast.error(`❌ The ${selectedRole} section has reached its limit of 10,000 applications and is now closed.`);
    setIsSubmitting(false);
    return;
  }

  const paddedId = String(count).padStart(3, "0");
  const uniqueID = `${rolePrefix}${paddedId}`;

  const { error } = await supabase.from("Audition Form").insert([
    {
      full_name: formData.full_name,
      date_of_birth: new Date(formData.date_of_birth).toISOString().split("T")[0],
      gender: formData.gender,
      nationality: formData.nationality,
      address: formData.address,
      phone_number: formData.phone,
      email: formData.email,
      height: formData.height,
      weight: formData.weight,
      hair_colour: formData.hair_color,
      eye_colour: formData.eye_color,
      ethnicity: formData.ethnicity,
      distinctive_features: formData.distinctive_features,
      Categories: selectedRole,
      availability: formData.availability,
      special_skills: formData.special_skills,
      language_spoken: formData.languages_spoken,
      social_links: formData.social_links,
       social_links2: formData.social_links2,
      resume: resumeUrl,
      head_shot_photo: headshotUrl,
      full_body_photo: fullBodyUrl,
      unique_id: uniqueID,
      payment_screenshot: paymentScreenshotUrl,
    },
  ]);

  setIsSubmitting(false);
  if (error) {
    toast.error("❌ Submission failed: " + error.message);
  } else {
    setIsSubmitted(true);
  }
};
  return (
    <Layout>
      <section className={styles.auditionSection}>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        <h1 className={styles.title}>Audition Categories</h1>

        
        {!user ? (
          <div className={styles.authContainer}>
            <div className={`${styles.cardWrapper} ${isFlipped ? styles.flip : ""}`}>
              <div className={styles.cardInner}>
               
                <div className={styles.cardFront}>
                  <h2>Sign Up</h2>
                  <form onSubmit={handleSignUp} className={styles.authForm}>
                    <input name="username" type="text" placeholder="Username" required />
                    <input name="email" type="email" placeholder="Email" required />
                    <div className={styles.passwordWrapper}>
                      <input name="password" type={showSignUpPassword ? "text" : "password"} placeholder="Password" required />
                      <img src={showSignUpPassword ? eyeIcon : eyeSlashIcon} alt=""  className={styles.eyeIcon}
                           onClick={() => setShowSignUpPassword(!showSignUpPassword)} />
                    </div>
                    <button type="submit">Sign Up</button>
                  </form>
                  <p className={styles.toggleText}>
                    Already have an account? <span onClick={() => setIsFlipped(true)}>Sign In</span>
                  </p>
                </div>

                
                <div className={styles.cardBack}>
                  <h2>Sign In</h2>
                  <p>If You are a new user please click on the below <strong>SignUp</strong> Link</p>
                  <form onSubmit={handleSignIn} className={styles.authForm}>
                    <input name="email" type="email" placeholder="Email" required />
                    <div className={styles.passwordWrapper}>
                      <input name="password" type={showSignInPassword ? "text" : "password"} placeholder="Password" required />
                      <img src={showSignInPassword ? eyeIcon : eyeSlashIcon} alt=""  className={styles.eyeIcon}
                           onClick={() => setShowSignInPassword(!showSignInPassword)} />
                    </div>
                    <div className={styles.forgotPassword}><a href="/reset-password">Forgot Password</a></div>
                    <button type="submit">Sign In</button>
                  </form>
                  <p className={styles.toggleText}>
                    Don't have an account? <span onClick={() => setIsFlipped(false)}>Sign Up</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.header}>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}

        {/* Roles Grid */}

 {user && (
          <>
            {!formOpen && (
              <div className={styles.formClosedMessage}>
                The audition form is currently closed. Please check back later.
              </div>
            )}
            <div className={styles.auditionGrid}>
              {auditionRoles.map((role, index) => {
                // const section = sectionStatus.find(s => s.section_name === role.title);
                const section = sectionStatus.find(s => s.category === role.title);

                const isSectionOpen = section ? section.is_open : true;
                return (
                  <div
                    key={index}
                    className={`${styles.auditionCard} ${!formOpen || !isSectionOpen ? styles.closed : ''}`}
                    onClick={() => handleCardClick(role.title)}
                  >
                    <div className={styles.auditionImageContainer}>
                      <img
                        src={role.image}
                        alt={role.title}
                        className={styles.auditionImage}
                        onError={(e) => {
                          e.target.src = "/images/placeholder.jpg";
                        }}
                      />
                    </div>
                    <p className={styles.auditionTitle}>{role.title}</p>
                    {!isSectionOpen && <span className={styles.closedBadge}>Closed</span>}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Application Form Modal */}
        {showForm && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalForm}>
              <span className={styles.closeButton} onClick={handleClose}>×</span>
              <h2>Application for {selectedRole}</h2>
              <form onSubmit={handleSubmit}>
                <fieldset>
                  <legend>Personal Information</legend>
                  <input name="full_name" type="text" onChange={handleInputChange} placeholder="Full Name" required />
                  <input type="date" name="date_of_birth" onChange={handleInputChange} required />
                   <input name="gender" type="text" onChange={handleInputChange} placeholder="Gender / Pronouns" />
                    <input name="nationality" type="text" onChange={handleInputChange} placeholder="Nationality" />
                  <input name="address" type="text" onChange={handleInputChange} placeholder="Address" />
                  <input name="phone" type="tel" onChange={handleInputChange} placeholder="Phone Number" required />
                  <input name="email" type="email" onChange={handleInputChange} placeholder="Email" required />
                </fieldset>

                <fieldset>
                  <legend>Physical Characteristics</legend>
                   <input name="height" type="text" onChange={handleInputChange} placeholder="Height" required />
                  <input name="weight" type="text" onChange={handleInputChange} placeholder="Weight" required />
                  <input name="hair_color" type="text" onChange={handleInputChange} placeholder="Hair Color" required />
                  <input name="eye_color" type="text" onChange={handleInputChange} placeholder="Eye Color" required />
                  <input name="ethnicity" type="text" onChange={handleInputChange} placeholder="Ethnicity(Optional)" />
                  <input name="distinctive_features" type="text" onChange={handleInputChange} placeholder="Distinctive Features" required />

                </fieldset>
                 <fieldset>
                  <legend>Role Information</legend>
                  <input type="text" name="Categories" value={selectedRole} readOnly />
                  <input name="availability" type="text" onChange={handleInputChange} placeholder="Availability" />
                </fieldset>

                <fieldset>
                  <legend>Experience & Skills</legend>
                  <label>Upload Resume:</label>
                  <input type="file" name="resume" onChange={handleFileChange} />
                  <input name="special_skills" type="text" onChange={handleInputChange} placeholder="Special Skills" required />
                  <input name="languages_spoken" type="text" onChange={handleInputChange} placeholder="Languages Spoken" required />
                  <input name="social_links" type="text" onChange={handleInputChange} placeholder="Social Links" required />
                  <input name="social_links2" type="text" onChange={handleInputChange} placeholder="Social Links" required />
                </fieldset>

                <fieldset>
                  <legend>Headshot & Media</legend>
                  <label>Upload Headshot:</label>
                  <input type="file" name="head_shot_photo" onChange={handleFileChange} required/>
                  <label>Upload Full Body Photo:</label>
                  <input type="file" name="full_body_photo" onChange={handleFileChange} required />

                </fieldset>
                
                <fieldset>
                  <legend>Payment Section</legend>
                  <div className={styles.paymentImageWrapper}>
                    <img
                      src="/images/GooglePay_QR.png" // keep your image in public/images
                      alt="Sample Payment Screenshot"
                      className={styles.paymentImage}
                    />
                  </div>
                  <small
                    style={{
                      color: "red",
                      fontWeight: "600",
                      display: "block",
                      textAlign: "center",
                      paddingBottom: "8px"
                    }}
                  >
                    * Application fee is ₹100. Pay using the above QR code.
                  </small>
                  <label>Payment Screenshot:</label>
                  <br />
                  <input
                  type="file"
                  name="payment_screenshot"
                  onChange={handleFileChange}
                  required
                />
                <br />
                <small style={{ color: "red", fontWeight: "600", display: "block", marginTop: "4px", marginBottom: "0px" }}>
                  * Providing fake or altered screenshots may lead to application rejection. Ensure the image clearly displays the transaction ID.
                </small>
                </fieldset>

                <div className={styles.termsSection}>
                <div className={styles.termsCheckbox}>
                  <input
                    type="checkbox"
                    checked={agreedToTermsInForm}
                    onChange={(e) => {
                      setAgreedToTermsInForm(e.target.checked);
                      if (e.target.checked) {
                        setShowTermsPopup(true);
                      }
                    }}
                  />
                  <label className={styles.termsLabel}>
                    I agree to Terms & Conditions.
                    <button
                      type="button"
                      className={styles.viewTerms}
                      onClick={() => setShowTermsPopup(true)}
                    >
                      View Terms & Conditions
                    </button>
                  </label>
                </div>
              </div>

              <button type="submit" disabled={isSubmitting || !agreedToTermsInForm}>
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
              </form>
            </div>
          </div>
        )}

        {/* Terms Popup */}
       {showTermsPopup && (
  <div className={styles.modalOverlay}>
    <div className={styles.termsPopup}>
      <span
        className={styles.closeButton}
        onClick={() => setShowTermsPopup(false)}
      >
        ×
      </span>
      <h2>Terms & Conditions</h2>
      <p style={{ textAlign: "justify" }}>
      </p>

      <p style={{ textAlign: "justify" }}>
        <h2 style={{color:"red",fontSize:"28px"}}>Privacy Policy</h2>
        We respect your privacy and are committed to protecting the personal information you share with us.
This Privacy Policy outlines how we collect, use, and safeguard your data in accordance with applicable
laws.
      </p>
<p style={{ textAlign: "justify" }}>- <span style={{color:"red",fontWeight:"600"}}>Information We Collect: </span> We may collect personal details such as your name, email address,
contact number, and other necessary information when you use our website or services.</p> 
<p style={{ textAlign: "justify" }}>- <span style={{color:"red",fontWeight:"600"}}>Use of Information: </span> The information collected is used to provide and improve our services,
process transactions, respond to inquiries, and send relevant updates.</p>
<p style={{ textAlign: "justify" }}>- <span style={{color:"red",fontWeight:"600"}}>Data Protection:</span> We implement appropriate technical and organizational measures to protect
your personal data against unauthorized access, alteration, disclosure, or destruction.</p>    
<p style={{ textAlign: "justify" }}>- <span style={{color:"red",fontWeight:"600"}}>Sharing of Information:</span> We do not sell, rent, or trade your personal data. Information may be
shared with trusted third-party service providers to help operate our business and deliver
services.</p>    
<p style={{ textAlign: "justify" }}>- <span style={{color:"red",fontWeight:"600"}}>Cookies:</span> Our website may use cookies to enhance user experience and analyze site traffic. You
can choose to disable cookies in your browser settings.</p>    
<p style={{ textAlign: "justify" }}>- <span style={{color:"red",fontWeight:"600"}}>Third-Party Links:</span> Our website may contain links to external sites. We are not responsible for the
content or privacy practices of these sites.</p>    
<p style={{ textAlign: "justify" }}>- <span style={{color:"red",fontWeight:"600"}}>Changes to Privacy Policy:</span> We may update this policy from time to time, and any changes will be
posted on this page.</p> 

<h2 style={{color:"red",fontSize:"28px"}}>Terms and Conditions</h2>
<p style={{ textAlign: "justify" }}>
By accessing or using our website and services, you agree to the following terms and conditions
   </p>
   
      <p style={{ textAlign: "justify" }}>
        <h3 style={{ color: "red", fontSize: "20px" }}>Use of Services:</h3>
        You agree to use our services only for lawful purposes and in compliance with all
applicable laws and regulations.
      </p>

      <p style={{ textAlign: "justify" }}>
        <h3 style={{ color: "red", fontSize: "20px" }}>Intellectual Property:</h3>
       All content, trademarks, and materials provided on our website are owned
by or licensed to us and are protected by applicable intellectual property laws.
      </p>

      <p style={{ textAlign: "justify" }}>
        <h3 style={{ color: "red", fontSize: "20px" }}>Prohibited Activities:</h3>
        You must not engage in any activity that interferes with or disrupts the
website or services.
      </p>

      <p style={{ textAlign: "justify" }}>
        <h3 style={{ color: "red", fontSize: "20px" }}>Limitation of Liability:</h3>
        We are not liable for any direct, indirect, incidental, or consequential
damages arising from your use of our website or services.
      </p>

      <p style={{ textAlign: "justify" }}>
        <h3 style={{ color: "red", fontSize: "20px" }}>Indemnification:</h3>
       You agree to indemnify and hold us harmless from any claims, damages,
liabilities, or expenses arising from your use of our services or violation of these terms
      </p>

      <p style={{ textAlign: "justify" }}>
        <h3 style={{ color: "red", fontSize: "20px" }}>Governing Law:</h3>
        These terms shall be governed by and construed in accordance with the laws of
Tamil Nadu, India.
      </p>
  <p style={{ textAlign: "justify" }}>
        <h3 style={{ color: "red", fontSize: "20px" }}>Changes to Terms:</h3>
        We may update these terms from time to time. Continued use of the website
after such changes indicates your acceptance.
      </p>
      
<h2 style={{color:"red",fontSize:"24px"}}>Refunds & Support</h2>
      
<p style={{ textAlign: "justify" }}>
  If you have any queries regarding refunds or require assistance, please contact us at:
</p>
<p style={{fontSize:"15px",fontWeight:"800"}}>Email:  <a href="support@directoravr.com" style={{ color: "red" }}>
          support@directoravr.com
        </a> <br />
Region: Tamil Nadu, India</p>

<p style={{ textAlign: "justify",fontWeight:"800" }}>All refund requests will be reviewed and processed in accordance with our refund policy. Updates
regarding your request will be communicated via email.</p>

      <button onClick={() => setShowTermsPopup(false)} style={{ marginTop: "35px" ,marginBottom:"25px"}}>Close</button>
    </div>
  </div>
)}
        {/* Thank You */}
        {isSubmitted && (
          <div className={styles.thankYouModal}>
            <div className={styles.thankYouContent}>
              <h2>🎉 Thank You!</h2>
              <p>Your application has been successfully submitted.</p>
              <button onClick={handleClose}>Close</button>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Audition;
