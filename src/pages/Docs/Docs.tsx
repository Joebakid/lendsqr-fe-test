import React from 'react';
import styles from './Docs.module.scss';
import { BookOpen, Code, ShieldCheck, Zap } from 'lucide-react';

const Docs = () => {
  const docSections = [
    {
      title: "Getting Started",
      icon: <Zap size={24} color="#39cdcc" />,
      description: "Learn how to navigate the dashboard and manage your first set of users."
    },
    {
      title: "API Reference",
      icon: <Code size={24} color="#213f7d" />,
      description: "Detailed documentation for integrating our lending engine into your own platform."
    },
    {
      title: "User Management",
      icon: <BookOpen size={24} color="#df18ff" />,
      description: "Guides on whitelisting, blacklisting, and verifying customer identities."
    },
    {
      title: "Security & Compliance",
      icon: <ShieldCheck size={24} color="#f55f44" />,
      description: "Understanding our data protection policies and regulatory compliance."
    }
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Documentation</h1>
        <p className={styles.subtitle}>Everything you need to know about managing your lending business on Lendsqr.</p>
      </header>

      <div className={styles.grid}>
        {docSections.map((section, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.iconBox}>{section.icon}</div>
            <h3>{section.title}</h3>
            <p>{section.description}</p>
            <button className={styles.readMore}>Read Manual</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Docs;