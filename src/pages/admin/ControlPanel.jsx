
import React from 'react';
import styles from './ControlPanel.module.css';

const ControlPanel = ({ sectionStatus, toggleSectionVisibility, formOpen }) => {
  return (
    <div className={styles.controlPanel}>
      <h2 className={styles.panelTitle}>🎛️ Section Control Panel</h2>

      {!formOpen && (
        <p className={styles.formClosedNotice}>
          🔒 The Audition form is closed. Section toggles are disabled.
        </p>
      )}

      <div className={styles.sectionList}>
        {sectionStatus.map((section) => (
          <div key={section.id} className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionName}>{section.category}</span>
              <span className={section.is_open ? styles.statusOpen : styles.statusClosed}>
                {section.is_open ? '🟢 Open' : '🔴 Closed'}
              </span>
            </div>

            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={section.is_open}
                onChange={() => toggleSectionVisibility(section.id, section.is_open)}
                disabled={!formOpen}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ControlPanel;
