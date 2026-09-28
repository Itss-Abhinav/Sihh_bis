import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductClassifier } from './components/ProductClassifier';
import { StandardsExplorer } from './components/StandardsExplorer';
import { ComplianceNavigator } from './components/ComplianceNavigator';
import { LaboratoryFinder } from './components/LaboratoryFinder';
import { QcoTracker } from './components/QcoTracker';
import { AiAssistant } from './components/AiAssistant';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('classifier');
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [presetProduct, setPresetProduct] = useState({ name: '', desc: '' });

  const handleSelectPreset = (name: string, desc: string) => {
    setPresetProduct({ name, desc });
    setActiveTab('classifier');
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        lang={lang} 
        setLang={setLang} 
      />

      <Hero 
        onSelectPreset={handleSelectPreset} 
        lang={lang} 
      />

      <main className="flex-1">
        {activeTab === 'classifier' && (
          <ProductClassifier 
            initialProductName={presetProduct.name}
            initialDescription={presetProduct.desc}
            lang={lang}
          />
        )}

        {activeTab === 'standards' && (
          <StandardsExplorer lang={lang} />
        )}

        {activeTab === 'navigator' && (
          <ComplianceNavigator lang={lang} />
        )}

        {activeTab === 'laboratories' && (
          <LaboratoryFinder lang={lang} />
        )}

        {activeTab === 'qco' && (
          <QcoTracker lang={lang} />
        )}

        {activeTab === 'assistant' && (
          <AiAssistant lang={lang} />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard lang={lang} />
        )}
      </main>

      <Footer lang={lang} />
    </div>
  );
};

export default App;
