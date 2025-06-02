import React from 'react';
import styles from './News.module.css';

const newsData = [
  {
    date: 'November 20, 2024',
    source: 'London Press',
    title: "'A. Veera Ragavan' Honored for Designing Inclusive Logo Depicting Three Religions",
    description:
      "A. Veera Ragavan (AVR) is recognized for his thoughtful design of an inclusive logo symbolizing unity among three major religions. His work stands as a powerful emblem of harmony, cultural respect, and shared identity",
    image: '/images/london.png',
    link: 'https://londonpress.uk/a-veera-ragavan-honored-for-designing-inclusive-logo-depicting-three-religions/',
  },
  {
    date: 'October 25, 2024',
    source: 'National Express',
    title:
      "A. Veera Ragavan from Tamil Nadu has transformed film title design into an award-winning art form.",
    description:
      "This young filmmaker has made a name for himself through his innovative approach to film poster design, showcasing his artistic flair and dedication to the craft.",
    image: '/images/AVR.png',
    link: 'https://www.nationalexpress.in/post/a-veera-ragavan-from-tamil-nadu-has-transformed-film-title-design-into-an-award-winning-art-form',
  },
  {
    date: 'November 3, 2024',
    source: 'Aisanow',
    title:
      'A.Veera Ragavan, an Indian filmmaker, has been awarded the Asia Talent Award 2024',
    description:
      'The artistry inherent in A. Veera Raghavan’s film title designs showcases an exceptional grasp of visual narrative, where each element is thoughtfully curated to elevate the audiences engagement.',
    image: '/images/asianow.png',
    link: 'https://www.asianowonline.com/post/a-veera-ragavan-an-indian-filmmaker-has-been-awarded-the-asia-talent-award-2024-the-recognition',
  },
  {
    date: '2024',
    source: 'Asian Excellence Award',
    title: "Interview: The Vision Behind 'Echoes of Tomorrow'",
    description:
      "Recently achieved a milestone by creating a logo that combines symbols from Hinduism, Islam, and Christianity. His design transcends linguistic and religious boundaries, promoting harmony and interconnectedness",
    image: '/images/asianexcellence1.png',
    link: 'https://www.instagram.com/p/DDgrHyLzIWl/?igsh=bXlmN3VlY2FoOTVr',
  },
  {
    date: 'November, 2024',
    source: 'Height Of Success Magazine',
    title: 'A. Veera Ragavan: Trailblazer in Tamil Filmmaking',
    description:
      'With over seven years of experience, he is recognized for blending artistic flair with cultural elements, earning him widespread acclaim',
    image: '/images/ghwgdj.png',
    link: 'https://www.instagram.com/p/DCgRzn4Tfak/?igsh=bXp6Mmtlcmd3OWxr',
  },
];

const News = () => (
  <section className={`${styles.newsSection} section-gap`}>
    <div className={styles.newsHeader}>
      <h2>News Articles</h2>
      <p>
        These featured articles highlight the remarkable contributions and
        enduring legacy of A. Veera Ragavan (AVR).
      </p>
    </div>
    <div className={styles.newsCards}>
      {newsData.map((item, idx) => (
        <div className={styles.newsCard} key={idx} tabIndex="0">
          <div className={styles.newsImage}>
            <img src={item.image} alt={`Logo of ${item.source}`} />
          </div>
          <div className={styles.newsContent}>
            <div className={styles.newsMeta}>
              <span>📅 {item.date}</span>
              <span>📝 {item.source}</span>
            </div>
            <h3 className={styles.newsTitle}>{item.title}</h3>
            <p className={styles.newsDescription}>{item.description}</p>
            <a
              href={item.link}
              className={styles.newsReadMore}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read more →
            </a>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default News;
