'use client';
import { useEffect, useState, useMemo } from 'react';

// ==================== INTERFACES ====================
interface Scheme {
  id?: number;
  name: string;
  category: string;
  description: string;
  benefits?: string;
  eligibility?: string;
  launch_date?: string;
  url: string;
}

interface ServiceItem {
  name: string;
  icon: string;
  url: string;
  category: string;
  description?: string;
}

interface JobPortal {
  name: string;
  icon: string;
  url: string;
  category: string;
  description: string;
  state?: string;
}

// ==================== MEGA DATA: JOBS (100+) ====================
const ALL_JOBS: JobPortal[] = [
  // === ALL INDIA CENTRAL GOVT ===
  { name: 'UPSC Official', icon: '🏛️', url: 'https://upsc.gov.in', category: 'Central', description: 'IAS, IPS, IFS Civil Services Exam' },
  { name: 'SSC Official', icon: '📝', url: 'https://ssc.nic.in', category: 'Central', description: 'CGL, CHSL, MTS, GD Constable' },
  { name: 'Employment News', icon: '📰', url: 'https://employmentnews.gov.in', category: 'Central', description: 'Weekly Govt Job Notifications' },
  { name: 'National Career Service', icon: '💼', url: 'https://www.ncs.gov.in', category: 'Central', description: 'Job Matching & Career Counseling' },
  { name: 'RRB (Railways)', icon: '🚆', url: 'https://rrbcdg.gov.in', category: 'Railway', description: 'NTPC, Group D, ALP, Technician' },
  { name: 'IBPS', icon: '🏦', url: 'https://ibps.in', category: 'Banking', description: 'PO, Clerk, SO, RRB Bank Exams' },
  { name: 'SBI Careers', icon: '💰', url: 'https://sbi.co.in/web/careers', category: 'Banking', description: 'SBI PO, Clerk, SCO Recruitment' },
  { name: 'RBI', icon: '🏛️', url: 'https://rbi.org.in', category: 'Banking', description: 'Grade B, Assistant, Manager' },
  { name: 'DRDO', icon: '🛡️', url: 'https://drdo.gov.in', category: 'Defence', description: 'Scientist, CEPTAM, MTS' },
  { name: 'ISRO', icon: '🚀', url: 'https://isro.gov.in', category: 'Defence', description: 'Scientist/Engineer, Technical Asst' },
  { name: 'Indian Army', icon: '🎖️', url: 'https://joinindianarmy.nic.in', category: 'Defence', description: 'Agniveer, NDA, CDS, SSC Tech' },
  { name: 'Indian Navy', icon: '⚓', url: 'https://joinindiannavy.gov.in', category: 'Defence', description: 'Agniveer, SSR, AA, Officer' },
  { name: 'Indian Air Force', icon: '✈️', url: 'https://careerairforce.nic.in', category: 'Defence', description: 'Agniveer Vayu, AFCAT, Group X/Y' },
  { name: 'BSF', icon: '🛡️', url: 'https://bsf.gov.in', category: 'Police/CAPF', description: 'Border Security Force Recruitment' },
  { name: 'CRPF', icon: '🔫', url: 'https://crpf.gov.in', category: 'Police/CAPF', description: 'Central Reserve Police Force' },  { name: 'CISF', icon: '🔒', url: 'https://cisfrectt.in', category: 'Police/CAPF', description: 'Industrial Security Force' },
  { name: 'ITBP', icon: '⛰️', url: 'https://itbpolice.nic.in', category: 'Police/CAPF', description: 'Indo-Tibetan Border Police' },
  { name: 'SSB', icon: '🏔️', url: 'https://ssbrectt.gov.in', category: 'Police/CAPF', description: 'Sashastra Seema Bal' },
  { name: 'Assam Rifles', icon: '🎯', url: 'https://assamrifles.gov.in', category: 'Police/CAPF', description: 'Rally & Officer Recruitment' },
  { name: 'Delhi Police', icon: '🚔', url: 'https://delhipolice.gov.in', category: 'Police/CAPF', description: 'Constable, SI, Head Constable' },
  { name: 'NTA', icon: '📋', url: 'https://nta.ac.in', category: 'Teaching', description: 'UGC NET, CUET, JEE Main' },
  { name: 'CTET', icon: '👨‍🏫', url: 'https://ctet.nic.in', category: 'Teaching', description: 'Central Teacher Eligibility Test' },
  { name: 'KVS Sangathan', icon: '🏫', url: 'https://kvsangathan.nic.in', category: 'Teaching', description: 'PGT, TGT, PRT, Principal' },
  { name: 'NVS', icon: '🎓', url: 'https://navodaya.gov.in', category: 'Teaching', description: 'Jawahar Navodaya Vidyalaya Jobs' },
  { name: 'CBSE', icon: '📚', url: 'https://cbse.gov.in', category: 'Teaching', description: 'Board Exams & Affiliation' },
  { name: 'NCERT', icon: '📖', url: 'https://ncert.nic.in', category: 'Teaching', description: 'Research & Training Positions' },
  { name: 'UGC', icon: '🎓', url: 'https://ugc.ac.in', category: 'Teaching', description: 'NET, Fellowships, Grants' },
  { name: 'AICTE', icon: '🔧', url: 'https://aicte-india.org', category: 'Teaching', description: 'Technical Education Approvals' },
  { name: 'EPFO', icon: '💳', url: 'https://epfindia.gov.in', category: 'PSU/Others', description: 'EO/AO, APFC, UDC Recruitment' },
  { name: 'ESIC', icon: '🏥', url: 'https://esic.gov.in', category: 'PSU/Others', description: 'Insurance Medical Officers' },
  { name: 'LIC', icon: '🛡️', url: 'https://licindia.in', category: 'PSU/Others', description: 'AAO, AAE, Assistant, Agent' },
  { name: 'FCI', icon: '🌾', url: 'https://fci.gov.in', category: 'PSU/Others', description: 'Manager, JE, AG, Watchman' },
  { name: 'NTPC', icon: '⚡', url: 'https://ntpc.co.in', category: 'PSU/Others', description: 'Engineering & Non-Tech Posts' },
  { name: 'BHEL', icon: '🏭', url: 'https://careers.bhel.in', category: 'PSU/Others', description: 'Engineer Trainee, Supervisor' },
  { name: 'IOCL', icon: '⛽', url: 'https://iocl.com', category: 'PSU/Others', description: 'Officers, Assistants, Apprentices' },
  { name: 'ONGC', icon: '🛢️', url: 'https://ongcindia.com', category: 'PSU/Others', description: 'Graduate Trainee through GATE' },
  { name: 'Coal India', icon: '⛏️', url: 'https://coalindia.in', category: 'PSU/Others', description: 'MT, Mining Sirdar, Overman' },
  { name: 'GAIL', icon: '🔥', url: 'https://gailonline.com', category: 'PSU/Others', description: 'Executive & Non-Executive' },
  { name: 'HAL', icon: '✈️', url: 'https://hal-india.co.in', category: 'PSU/Others', description: 'Hindustan Aeronautics Limited' },
  { name: 'BEL', icon: '📡', url: 'https://bel-india.in', category: 'PSU/Others', description: 'Bharat Electronics Limited' },
  { name: 'BPNL', icon: '🐄', url: 'https://bpnl.org', category: 'PSU/Others', description: 'Bharat Pashupalan Nigam' },
  { name: 'India Post GDS', icon: '📮', url: 'https://indiapostgdsonline.gov.in', category: 'Central', description: 'Gramin Dak Sevak Recruitment' },
  { name: 'Supreme Court', icon: '⚖️', url: 'https://main.sci.gov.in', category: 'Judiciary', description: 'Clerk, Steno, Junior Court Asst' },
  { name: 'High Courts', icon: '⚖️', url: 'https://highcourtchd.gov.in', category: 'Judiciary', description: 'Various HC Recruitment' },

  // === STATE GOVT (UP FOCUSED + OTHERS) ===
  { name: 'UPPSC', icon: '🏛️', url: 'https://uppsc.up.nic.in', category: 'State UP', description: 'PCS, RO/ARO, RFO, CDPO' },
  { name: 'UPSSSC', icon: '📋', url: 'https://upsssc.gov.in', category: 'State UP', description: 'Lekhpal, VDO, Gram Panchayat Adhikari' },
  { name: 'UP Police', icon: '👮', url: 'https://uppbpb.gov.in', category: 'State UP', description: 'Constable, SI, ASI, Clerk' },
  { name: 'UP Basic Edu Board', icon: '👩‍🏫', url: 'https://upbasiceduboard.gov.in', category: 'State UP', description: 'TGT, PGT, Primary Teacher' },
  { name: 'UPPCL', icon: '💡', url: 'https://uppcl.org', category: 'State UP', description: 'JE, Lineman, Computer Operator' },
  { name: 'UPRVUNL', icon: '⚡', url: 'https://uprvunl.org', category: 'State UP', description: 'Trainee Engineer, Jr. Engineer' },
  { name: 'UP Jal Nigam', icon: '💧', url: 'https://upjn.org', category: 'State UP', description: 'AE, JE, Clerical Cadre' },
  { name: 'UP Forest Dept', icon: '🌲', url: 'https://upforest.gov.in', category: 'State UP', description: 'Forest Guard, Ranger' },
  { name: 'UP Health Dept', icon: '🏥', url: 'https://upnrhm.gov.in', category: 'State UP', description: 'ANM, Staff Nurse, Pharmacist' },
  { name: 'UP Transport', icon: '🚌', url: 'https://uptransport.upsdc.gov.in', category: 'State UP', description: 'Driving License, Vehicle Reg' },
  { name: 'UKPSC', icon: '🏔️', url: 'https://psc.uk.gov.in', category: 'State Other', description: 'Uttarakhand Public Service' },
  { name: 'UKSSSC', icon: '📋', url: 'https://sssc.uk.gov.in', category: 'State Other', description: 'Uttarakhand Subordinate' },
  { name: 'BPSC', icon: '🏛️', url: 'https://bpsc.bih.nic.in', category: 'State Other', description: 'Bihar Public Service Commission' },
  { name: 'BSSC', icon: '📋', url: 'https://bssc.bih.nic.in', category: 'State Other', description: 'Bihar Staff Selection' },
  { name: 'MPSC', icon: '🏛️', url: 'https://mpsc.gov.in', category: 'State Other', description: 'Maharashtra Public Service' },
  { name: 'RPSC', icon: '🏛️', url: 'https://rpsc.rajasthan.gov.in', category: 'State Other', description: 'Rajasthan Public Service' },
  { name: 'RSSB', icon: '📋', url: 'https://rssb.rajasthan.gov.in', category: 'State Other', description: 'Rajasthan Staff Selection' },
  { name: 'HPSC', icon: '🏛️', url: 'https://hpsc.gov.in', category: 'State Other', description: 'Haryana Public Service' },
  { name: 'DSSSB', icon: '📋', url: 'https://dsssb.delhi.gov.in', category: 'State Other', description: 'Delhi Subordinate Services' },  { name: 'WBSSC', icon: '📋', url: 'https://wbssc.gov.in', category: 'State Other', description: 'West Bengal Staff Selection' },
  { name: 'TNPSC', icon: '🏛️', url: 'https://tnpsc.gov.in', category: 'State Other', description: 'Tamil Nadu Public Service' },
  { name: 'KPSC', icon: '🏛️', url: 'https://kpsc.kar.nic.in', category: 'State Other', description: 'Karnataka Public Service' },
  { name: 'APPSC', icon: '🏛️', url: 'https://psc.ap.gov.in', category: 'State Other', description: 'Andhra Pradesh Public Service' },
  { name: 'TSPSC', icon: '🏛️', url: 'https://tspsc.gov.in', category: 'State Other', description: 'Telangana Public Service' },
  { name: 'GPSC', icon: '🏛️', url: 'https://gpsc.gujarat.gov.in', category: 'State Other', description: 'Gujarat Public Service' },
  { name: 'OPSC', icon: '🏛️', url: 'https://opsc.gov.in', category: 'State Other', description: 'Odisha Public Service' },
  { name: 'CGPSC', icon: '🏛️', url: 'https://psc.cg.gov.in', category: 'State Other', description: 'Chhattisgarh Public Service' },
  { name: 'JPSC', icon: '🏛️', url: 'https://jpsc.gov.in', category: 'State Other', description: 'Jharkhand Public Service' },
];

// ==================== MEGA DATA: CSC & ONLINE SERVICES (50+) ====================
const ALL_CSC_SERVICES: ServiceItem[] = [
  // Identity & Documents
  { name: 'Aadhaar Card', icon: '🆔', url: 'https://myaadhaar.uidai.gov.in', category: 'Identity', description: 'Update, Download, Biometric Lock' },
  { name: 'PAN Card (NSDL)', icon: '💳', url: 'https://www.tin-nsdl.com', category: 'Identity', description: 'New PAN, Correction, Reprint' },
  { name: 'PAN Card (UTIITSL)', icon: '💳', url: 'https://www.pan.utiitsl.com', category: 'Identity', description: 'Apply Online, Track Status' },
  { name: 'Voter ID (ECI)', icon: '🗳️', url: 'https://voters.eci.gov.in', category: 'Identity', description: 'Register, Search, Correction' },
  { name: 'Passport Seva', icon: '🛂', url: 'https://passportindia.gov.in', category: 'Travel', description: 'Fresh, Renewal, Tatkal Passport' },
  { name: 'Driving Licence', icon: '🚗', url: 'https://parivahan.gov.in/sarathiservice', category: 'Transport', description: 'LLR, DL, International Permit' },
  { name: 'Vehicle Registration', icon: '🏍️', url: 'https://vahan.parivahan.gov.in', category: 'Transport', description: 'RC Transfer, Tax Payment, NOC' },
  { name: 'eShram Card', icon: '👷', url: 'https://eshram.gov.in', category: 'Labour', description: 'Unorganized Worker Registration' },
  { name: 'ABHA Health ID', icon: '🏥', url: 'https://abha.abdm.gov.in', category: 'Health', description: 'Digital Health Records' },
  { name: 'Ayushman Bharat', icon: '💊', url: 'https://pmjay.gov.in', category: 'Health', description: 'Check Eligibility, Download Card' },
  { name: 'Birth Certificate', icon: '👶', url: 'https://crsorgi.gov.in', category: 'Certificate', description: 'Birth & Death Registration' },
  { name: 'Marriage Certificate', icon: '💍', url: 'https://marriage.up.nic.in', category: 'Certificate', description: 'Hindu/Special Marriage Act' },
  { name: 'Caste Certificate', icon: '📜', url: 'https://edistrict.up.gov.in', category: 'Certificate', description: 'SC/ST/OBC/EWS Certificate' },
  { name: 'Income Certificate', icon: '💰', url: 'https://edistrict.up.gov.in', category: 'Certificate', description: 'Income Proof for Schemes' },
  { name: 'Domicile Certificate', icon: '🏡', url: 'https://edistrict.up.gov.in', category: 'Certificate', description: 'Residence Proof' },
  { name: 'Character Certificate', icon: '✅', url: 'https://uppolice.gov.in', category: 'Certificate', description: 'Police Verification' },
  
  // Land & Revenue
  { name: 'UP Bhulekh', icon: '🗺️', url: 'https://upbhulekh.gov.in', category: 'Land', description: 'Khatauni, Khasra, Map' },
  { name: 'IGRS UP (Registry)', icon: '📄', url: 'https://igrsup.gov.in', category: 'Land', description: 'Property Registration, Stamp Duty' },
  { name: 'Encumbrance Cert', icon: '🔍', url: 'https://igrsup.gov.in', category: 'Land', description: 'Non-Encumbrance Certificate' },
  { name: 'ROR (Record of Rights)', icon: '📋', url: 'https://upbhulekh.gov.in', category: 'Land', description: 'Land Ownership Records' },
  
  // Utility Bills
  { name: 'Electricity Bill (UPPCL)', icon: '💡', url: 'https://uppcl.org', category: 'Utility', description: 'Bill Payment, New Connection' },
  { name: 'Water Bill (Jal Kal)', icon: '💧', url: 'https://jalboard.up.nic.in', category: 'Utility', description: 'Water Tax Payment' },
  { name: 'Property Tax', icon: '🏠', url: 'https://upnagarik.in', category: 'Utility', description: 'House Tax Payment' },
  { name: 'Gas Booking', icon: '🔥', url: 'https://mylpg.in', category: 'Utility', description: 'Indane, HP, Bharat Gas' },
  { name: 'FASTag Recharge', icon: '🛣️', url: 'https://fastag.ippbonline.com', category: 'Utility', description: 'NHAI Toll Payment' },
  
  // Labour & Welfare
  { name: 'UPBOCW', icon: '🏗️', url: 'https://upbocw.in', category: 'Labour', description: 'Construction Worker Benefits' },
  { name: 'Shram Suvidha', icon: '👷', url: 'https://shramsuvidha.gov.in', category: 'Labour', description: 'Labour Compliance Portal' },
  { name: 'UAN / PF Portal', icon: '💰', url: 'https://unifiedportal-mem.epfindia.gov.in', category: 'Labour', description: 'PF Claim, Transfer, Passbook' },
  { name: 'Ration Card', icon: '🍚', url: 'https://fcs.up.gov.in', category: 'Food', description: 'NFSA, Ration Card List' },
  { name: 'One Nation One Ration', icon: '🇮🇳', url: 'https://impds.nic.in', category: 'Food', description: 'Portability Check' },  
  // Financial & Tax
  { name: 'Income Tax Portal', icon: '📊', url: 'https://incometax.gov.in', category: 'Finance', description: 'ITR Filing, TDS, Refund' },
  { name: 'GST Portal', icon: '🧾', url: 'https://gst.gov.in', category: 'Finance', description: 'GST Return, Registration' },
  { name: 'MSME Udyam', icon: '🏭', url: 'https://udyamregistration.gov.in', category: 'Business', description: 'Small Business Registration' },
  { name: 'FSSAI License', icon: '🍽️', url: 'https://foscos.fssai.gov.in', category: 'Business', description: 'Food Safety License' },
  { name: 'Trade Mark', icon: '™️', url: 'https://ipindia.gov.in/trade-marks.htm', category: 'Business', description: 'Brand Registration' },
  { name: 'Company Registration', icon: '🏢', url: 'https://mca.gov.in', category: 'Business', description: 'MCA21 Corporate Affairs' },
  
  // Student & Education
  { name: 'National Scholarship', icon: '🎓', url: 'https://scholarships.gov.in', category: 'Education', description: 'All Central Scholarships' },
  { name: 'UP Scholarship', icon: '📚', url: 'https://scholarship.up.gov.in', category: 'Education', description: 'Samaj Kalyan Scholarship' },
  { name: 'PMKVY Skill', icon: '🔧', url: 'https://pmkvyskill.gov.in', category: 'Education', description: 'Free Skill Training' },
  { name: 'DIKSHA Learning', icon: '💻', url: 'https://diksha.gov.in', category: 'Education', description: 'School Education Content' },
  { name: 'SWAYAM Courses', icon: '📖', url: 'https://swayam.gov.in', category: 'Education', description: 'Free Online MOOCs' },
  { name: 'IGNOU Admission', icon: '🎓', url: 'https://ignou.ac.in', category: 'Education', description: 'Open University Courses' },
  { name: 'CUET Portal', icon: '📝', url: 'https://exams.nta.ac.in/CUET-UG', category: 'Education', description: 'Central University Entrance' },
  
  // Others
  { name: 'Police Complaint', icon: '🚨', url: 'https://upcctns.gov.in', category: 'Legal', description: 'Online FIR / Complaint' },
  { name: 'Consumer Forum', icon: '⚖️', url: 'https://edaakhil.nic.in', category: 'Legal', description: 'Consumer Grievance' },
  { name: 'RTI Online', icon: '📬', url: 'https://rtionline.gov.in', category: 'Legal', description: 'Right to Information' },
  { name: 'Post Office Savings', icon: '📮', url: 'https://ebanking.indiapost.gov.in', category: 'Finance', description: 'RD, TD, SSA, PPF' },
  { name: 'Telecom Complaint', icon: '📱', url: 'https://tarangsanchar.gov.in', category: 'Utility', description: 'Mobile Tower / Signal Issues' },
];

// ==================== COMPONENT START ====================
export default function Home() {
  const [dbSchemes, setDbSchemes] = useState<Scheme[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [jobFilter, setJobFilter] = useState('all');
  const [cscFilter, setCscFilter] = useState('all');

  // Fetch DB Schemes
  useEffect(() => {
    fetchDbSchemes();
  }, []);

  const fetchDbSchemes = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/schemes?limit=200');
      const data = await res.json();
      if (Array.isArray(data)) setDbSchemes(data);
    } catch (e) { console.error(e); }    setLoading(false);
  };

  const triggerAutoUpdate = async () => {
    setUpdating(true);
    setUpdateMessage('');
    try {
      const res = await fetch('/api/cron/auto-update', { method: 'POST' });
      const data = await res.json();
      setUpdateMessage(data.message || 'Updated!');
      setTimeout(() => { fetchDbSchemes(); setUpdating(false); }, 2000);
    } catch { setUpdateMessage('Update failed.'); setUpdating(false); }
  };

  const openLink = (url: string) => window.open(url, '_blank');

  // Filtered Lists
  const filteredJobs = useMemo(() => 
    jobFilter === 'all' ? ALL_JOBS : ALL_JOBS.filter(j => j.category.includes(jobFilter)),
  [jobFilter]);

  const filteredCSC = useMemo(() => 
    cscFilter === 'all' ? ALL_CSC_SERVICES : ALL_CSC_SERVICES.filter(s => s.category.includes(cscFilter)),
  [cscFilter]);

  const searchedSchemes = useMemo(() => {
    if (!search) return dbSchemes;
    const q = search.toLowerCase();
    return dbSchemes.filter(s => 
      s.name?.toLowerCase().includes(q) || 
      s.description?.toLowerCase().includes(q) ||
      s.category?.toLowerCase().includes(q)
    );
  }, [search, dbSchemes]);

  const jobCategories = ['all', 'Central', 'Railway', 'Banking', 'Defence', 'Police/CAPF', 'Teaching', 'State UP', 'State Other', 'PSU/Others', 'Judiciary'];
  const cscCategories = ['all', 'Identity', 'Transport', 'Health', 'Certificate', 'Land', 'Utility', 'Labour', 'Food', 'Finance', 'Business', 'Education', 'Legal'];
  // ==================== RENDER ====================
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 font-sans">
      {/* Google AdSense Script - Replace with your actual Publisher ID */}
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossOrigin="anonymous"></script>

      {/* ===== STICKY HEADER ===== */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button onClick={() => setShowMenu(true)} className="p-2 rounded-xl bg-orange-100 hover:bg-orange-200 transition active:scale-95" aria-label="Menu">
              <svg className="w-6 h-6 text-orange-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <div onClick={() => setActiveTab('home')} className="cursor-pointer">
              <h1 className="text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 leading-tight">🇮🇳 सरकारी योजना Hub</h1>
              <p className="text-[10px] md:text-xs text-gray-500 font-medium tracking-wide">JOBS • SCHEMES • CSC • SERVICES</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setActiveTab('settings')} className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition" aria-label="Settings">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
          </div>
        </div>
      </header>

      {/* ===== ADSENSE TOP BANNER ===== */}
      <div className="max-w-7xl mx-auto px-4 mt-3 mb-2">
        <ins className="adsbygoogle" style={{display:'block'}} data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" data-ad-slot="XXXXXXXXXX" data-ad-format="horizontal" data-full-width-responsive="true"></ins>
      </div>

      {/* ===== SIDE MENU OVERLAY ===== */}
      {showMenu && (
        <div className="fixed inset-0 z-[60] flex animate-in fade-in duration-200">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowMenu(false)}></div>
          <div className="relative bg-white w-72 h-full shadow-2xl overflow-y-auto animate-in slide-in-from-left duration-300">
            <div className="p-5 bg-gradient-to-r from-orange-500 to-red-600 text-white">
              <h2 className="text-2xl font-bold">☰ Menu</h2>
              <p className="text-orange-100 text-sm mt-1">Navigate all sections</p>
            </div>
            <nav className="p-3 space-y-1">
              {[
                { id: 'home', icon: '🏠', label: 'Home Dashboard', sub: 'Overview & Quick Links' },
                { id: 'schemes', icon: '📋', label: 'Govt Schemes', sub: `${dbSchemes.length}+ Active Schemes` },
                { id: 'jobs', icon: '💼', label: 'Sarkari Jobs', sub: `${ALL_JOBS.length}+ Job Portals` },
                { id: 'csc', icon: '🏛️', label: 'CSC & Services', sub: `${ALL_CSC_SERVICES.length}+ Online Services` },
                { id: 'ministries', icon: '🇮🇳', label: 'Ministries & Depts', sub: 'All Govt Websites' },
                { id: 'settings', icon: '⚙️', label: 'Settings & Info', sub: 'App Preferences' },
              ].map((item) => (
                <button key={item.id} onClick={() => { setActiveTab(item.id); setShowMenu(false); }}                  className={`w-full text-left px-4 py-3.5 rounded-xl flex items-center gap-3 transition-all ${activeTab === item.id ? 'bg-orange-100 text-orange-800 shadow-sm border border-orange-200' : 'hover:bg-gray-50 text-gray-700'}`}>
                  <span className="text-2xl">{item.icon}</span>
                  <div><p className="font-bold text-sm">{item.label}</p><p className="text-[10px] text-gray-500">{item.sub}</p></div>
                </button>
              ))}
            </nav>
            <div className="p-4 mt-4 border-t">
              <p className="text-[10px] text-gray-400 text-center">© 2026 Sarkari Yojana Hub v2.0</p>
            </div>
          </div>
        </div>
      )}

      {/* ===== MAIN CONTENT AREA ===== */}
      <div className="max-w-7xl mx-auto px-4 py-4 pb-20">

        {/* HOME TAB */}
        {activeTab === 'home' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="text-center py-6">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">Welcome to Your <span className="text-orange-600">Sarkari Portal</span></h2>
              <p className="text-gray-500 max-w-lg mx-auto">One stop destination for all Government Schemes, Jobs, CSC Services, and Official Portals.</p>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Schemes', value: `${dbSchemes.length}+`, color: 'bg-orange-100 text-orange-700' },
                { label: 'Job Portals', value: `${ALL_JOBS.length}+`, color: 'bg-blue-100 text-blue-700' },
                { label: 'CSC Services', value: `${ALL_CSC_SERVICES.length}+`, color: 'bg-green-100 text-green-700' },
                { label: 'Auto Updates', value: 'Active', color: 'bg-purple-100 text-purple-700' },
              ].map((stat, i) => (
                <div key={i} className={`${stat.color} p-4 rounded-2xl text-center font-bold shadow-sm`}>
                  <p className="text-2xl md:text-3xl">{stat.value}</p>
                  <p className="text-xs opacity-80">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Quick Access Grid */}
            <h3 className="text-xl font-bold text-gray-800 pt-2">⚡ Quick Access</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {[
                { name: 'Jobs', icon: '💼', tab: 'jobs' },
                { name: 'Schemes', icon: '📋', tab: 'schemes' },
                { name: 'CSC', icon: '🏛️', tab: 'csc' },
                { name: 'Police', icon: '👮', filter: 'Police', type: 'job' },
                { name: 'Teaching', icon: '👨‍🏫', filter: 'Teaching', type: 'job' },
                { name: 'Railway', icon: '🚆', filter: 'Railway', type: 'job' },
                { name: 'Banking', icon: '🏦', filter: 'Banking', type: 'job' },                { name: 'Defence', icon: '🎖️', filter: 'Defence', type: 'job' },
                { name: 'Aadhaar', icon: '🆔', url: 'https://myaadhaar.uidai.gov.in' },
                { name: 'PAN Card', icon: '💳', url: 'https://www.tin-nsdl.com' },
                { name: 'Passport', icon: '🛂', url: 'https://passportindia.gov.in' },
                { name: 'MyScheme', icon: '🌐', url: 'https://myscheme.gov.in' },
              ].map((item, i) => (
                <button key={i} onClick={() => {
                  if (item.url) openLink(item.url);
                  else if (item.tab) setActiveTab(item.tab as any);
                  else if (item.type === 'job') { setJobFilter(item.filter!); setActiveTab('jobs'); }
                }} className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-orange-300 transition flex flex-col items-center gap-2 text-center">
                  <span className="text-2xl md:text-3xl">{item.icon}</span>
                  <span className="text-xs font-bold text-gray-700">{item.name}</span>
                </button>
              ))}
            </div>

            {/* Latest Schemes Preview */}
            <div className="pt-2">
              <div className="flex justify-between items-end mb-3">
                <h3 className="text-xl font-bold text-gray-800">🔥 Latest Schemes</h3>
                <button onClick={() => setActiveTab('schemes')} className="text-xs text-orange-600 font-bold">View All →</button>
              </div>
              {loading ? (
                <div className="text-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div></div>
              ) : (
                <div className="grid md:grid-cols-3 gap-4">
                  {dbSchemes.slice(0, 3).map((s, i) => (
                    <div key={i} onClick={() => openLink(s.url || `https://www.google.com/search?q=${encodeURIComponent(s.name + ' official site:gov.in')}`)} className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-orange-500 cursor-pointer hover:shadow-md transition">
                      <span className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-bold">{s.category}</span>
                      <h4 className="font-bold text-sm mt-2 text-gray-900 line-clamp-2">{s.name}</h4>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{s.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* SCHEMES TAB */}
        {activeTab === 'schemes' && (
          <div className="animate-in fade-in duration-300">
            <div className="mb-5 flex flex-col sm:flex-row gap-3">
              <input type="text" placeholder="🔍 Search schemes..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 p-3.5 rounded-xl border-2 border-orange-200 focus:border-orange-500 outline-none font-medium" />
              <button onClick={triggerAutoUpdate} disabled={updating} className="bg-orange-500 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-orange-600 disabled:bg-gray-400 transition whitespace-nowrap">
                {updating ? '⏳ Updating...' : '🔄 Auto Update'}
              </button>
            </div>
            {updateMessage && <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-xl text-center text-sm font-bold">✅ {updateMessage}</div>}            
            {loading ? (
              <div className="text-center py-16"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500 mx-auto"></div><p className="mt-3 text-gray-500">Loading schemes...</p></div>
            ) : searchedSchemes.length === 0 ? (
              <div className="text-center py-16 text-gray-500">No schemes found. Try different search or click Auto Update.</div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchedSchemes.map((scheme, i) => (
                  <div key={scheme.id || i} onClick={() => openLink(scheme.url || `https://www.google.com/search?q=${encodeURIComponent(scheme.name + ' official site:gov.in')}`)} className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-lg transition border-l-4 border-orange-500 cursor-pointer group">
                    <span className="text-[10px] bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-bold uppercase tracking-wider">{scheme.category}</span>
                    <h3 className="text-base font-extrabold mt-3 mb-2 text-gray-900 group-hover:text-orange-600 transition">{scheme.name}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-3">{scheme.description}</p>
                    {scheme.benefits && <p className="text-xs text-green-700 bg-green-50 p-2 rounded-lg mb-2 font-medium">💰 {scheme.benefits}</p>}
                    <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-100">
                      <span className="text-[10px] text-gray-400">📅 {scheme.launch_date || 'N/A'}</span>
                      <span className="text-xs text-orange-600 font-bold group-hover:translate-x-1 transition-transform">Visit →</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* JOBS TAB */}
        {activeTab === 'jobs' && (
          <div className="animate-in fade-in duration-300">
            <div className="text-center mb-5">
              <h2 className="text-2xl font-extrabold text-gray-900">💼 All Government Jobs</h2>
              <p className="text-sm text-gray-500">{ALL_JOBS.length}+ Official Recruitment Portals</p>
            </div>
            <div className="mb-5 flex flex-wrap gap-2 justify-center">
              {jobCategories.map(cat => (
                <button key={cat} onClick={() => setJobFilter(cat)} className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${jobFilter === cat ? 'bg-orange-500 text-white shadow-md' : 'bg-white text-gray-600 border hover:border-orange-300'}`}>
                  {cat === 'all' ? 'All Jobs' : cat}
                </button>
              ))}
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredJobs.map((job, i) => (
                <div key={i} onClick={() => openLink(job.url)} className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-lg transition border-l-4 border-blue-500 cursor-pointer group flex items-start gap-3">
                  <span className="text-3xl mt-1">{job.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition truncate pr-2">{job.name}</h3>
                      <span className="text-[9px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold whitespace-nowrap">{job.category}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{job.description}</p>
                    <p className="text-[10px] text-blue-600 font-bold mt-2 group-hover:underline">Apply / Visit →</p>
                  </div>                </div>
              ))}
            </div>
          </div>
        )}

        {/* CSC SERVICES TAB */}
        {activeTab === 'csc' && (
          <div className="animate-in fade-in duration-300">
            <div className="text-center mb-5">
              <h2 className="text-2xl font-extrabold text-gray-900">🏛️ CSC & Online Services</h2>
              <p className="text-sm text-gray-500">{ALL_CSC_SERVICES.length}+ Digital Services at Your Fingertips</p>
            </div>
            <div className="mb-5 flex flex-wrap gap-2 justify-center">
              {cscCategories.map(cat => (
                <button key={cat} onClick={() => setCscFilter(cat)} className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${cscFilter === cat ? 'bg-green-600 text-white shadow-md' : 'bg-white text-gray-600 border hover:border-green-300'}`}>
                  {cat === 'all' ? 'All Services' : cat}
                </button>
              ))}
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCSC.map((svc, i) => (
                <div key={i} onClick={() => openLink(svc.url)} className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-lg transition border-l-4 border-green-500 cursor-pointer group flex items-start gap-3">
                  <span className="text-3xl mt-1">{svc.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition truncate pr-2">{svc.name}</h3>
                      <span className="text-[9px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold whitespace-nowrap">{svc.category}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{svc.description}</p>
                    <p className="text-[10px] text-green-600 font-bold mt-2 group-hover:underline">Open Portal →</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MINISTRIES TAB */}
        {activeTab === 'ministries' && (
          <div className="animate-in fade-in duration-300">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-extrabold text-gray-900">🇮🇳 All Ministries & Departments</h2>
              <p className="text-sm text-gray-500">Direct links to every Government Ministry</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "President of India", url: "https://presidentofindia.nic.in", icon: "🏛️" },
                { name: "Prime Minister's Office", url: "https://pmindia.gov.in", icon: "🇮🇳" },
                { name: "Cabinet Secretariat", url: "https://cabsec.gov.in", icon: "📁" },                { name: "Ministry of Home Affairs", url: "https://mha.gov.in", icon: "🛡️" },
                { name: "Ministry of Defence", url: "https://mod.gov.in", icon: "⚔️" },
                { name: "Ministry of External Affairs", url: "https://mea.gov.in", icon: "🌍" },
                { name: "Ministry of Finance", url: "https://finmin.nic.in", icon: "💰" },
                { name: "Ministry of Education", url: "https://education.gov.in", icon: "📚" },
                { name: "Ministry of Health (MoHFW)", url: "https://mohfw.gov.in", icon: "🏥" },
                { name: "Ministry of Agriculture", url: "https://agricoop.nic.in", icon: "🌾" },
                { name: "Ministry of Rural Development", url: "https://mord.gov.in", icon: "🏡" },
                { name: "Ministry of Urban Dev (MoHUA)", url: "https://mohua.gov.in", icon: "🏙️" },
                { name: "Ministry of Railways", url: "https://indianrailways.gov.in", icon: "🚆" },
                { name: "Ministry of Road Transport", url: "https://morth.nic.in", icon: "🛣️" },
                { name: "Ministry of Civil Aviation", url: "https://civilaviation.gov.in", icon: "✈️" },
                { name: "Ministry of Shipping", url: "https://shipping.gov.in", icon: "🚢" },
                { name: "Ministry of Power", url: "https://powermin.nic.in", icon: "⚡" },
                { name: "Ministry of New & Renewable Energy", url: "https://mnre.gov.in", icon: "☀️" },
                { name: "Ministry of Petroleum", url: "https://petroleum.nic.in", icon: "⛽" },
                { name: "Ministry of Coal", url: "https://coal.nic.in", icon: "⛏️" },
                { name: "Ministry of Mines", url: "https://mines.gov.in", icon: "💎" },
                { name: "Ministry of Steel", url: "https://steel.gov.in", icon: "🏗️" },
                { name: "Ministry of Heavy Industries", url: "https://heavyindustries.gov.in", icon: "🏭" },
                { name: "Ministry of MSME", url: "https://msme.gov.in", icon: "🔧" },
                { name: "Ministry of Textiles", url: "https://textiles.gov.in", icon: "🧵" },
                { name: "Ministry of Commerce & Industry", url: "https://commerce.gov.in", icon: "📊" },
                { name: "Ministry of Electronics & IT", url: "https://meity.gov.in", icon: "💻" },
                { name: "Ministry of Communications", url: "https://dot.gov.in", icon: "📡" },
                { name: "Ministry of Labour", url: "https://labour.gov.in", icon: "👷" },
                { nam
