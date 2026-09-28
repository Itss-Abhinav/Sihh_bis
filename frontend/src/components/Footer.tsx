import React from 'react';
import { ShieldCheck, Scale, ExternalLink } from 'lucide-react';

export const Footer: React.FC<{ lang: 'en' | 'hi' }> = ({ lang }) => {
  return (
    <footer className="bg-[#070b14] border-t border-slate-800/80 text-xs text-slate-400 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 text-white font-bold text-sm mb-2">
              <span className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center text-xs">
                BIS
              </span>
              <span>MANAK-AI / BIS-SETU PORTAL</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              National Autonomous Conformity Screening Platform built for the Smart India Hackathon. Integrates deterministic regulatory logic with the Bureau of Indian Standards Act 2016 and mandatory Quality Control Orders (QCOs).
            </p>
            <div className="mt-4 flex items-center space-x-2 text-[11px] text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Zero-Secret Hardened Architecture - Secure Enterprise Deploy</span>
            </div>
          </div>

          {/* Quick Regulatory Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 uppercase tracking-wider text-[11px]">
              Official Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://www.bis.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition flex items-center space-x-1">
                  <span>BIS Official Website</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="https://www.manakonline.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition flex items-center space-x-1">
                  <span>Manakonline Portal (e-BIS)</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="https://www.crsbis.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition flex items-center space-x-1">
                  <span>Compulsory Registration Scheme (CRS)</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="https://dpiit.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition flex items-center space-x-1">
                  <span>DPIIT Quality Control Orders</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
            </ul>
          </div>

          {/* Statutory Notice */}
          <div>
            <h4 className="text-white font-semibold mb-3 uppercase tracking-wider text-[11px] flex items-center space-x-1">
              <Scale className="w-3.5 h-3.5 text-amber-400" />
              <span>Statutory Advisory</span>
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Automated screening result is a regulatory guidance advisory and does not replace statutory license grants by the Bureau of Indian Standards under Section 13 of the BIS Act 2016.
            </p>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500">
          <div>
            © 2026 Bureau of Indian Standards - Manak-AI Portal. Developed for Smart India Hackathon.
          </div>
          <div className="mt-2 sm:mt-0 flex items-center space-x-4">
            <span>ISO/IEC 17025 Compliant Labs</span>
            <span>Section 29 BIS Act Enforced</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
