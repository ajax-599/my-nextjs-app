import { useState, useEffect } from "react";
import axios from "axios";
import InputMask from "react-input-mask";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [smoker, setSmoker] = useState("");
  const [surgeries, setSurgeries] = useState<string[]>([]);
  const [conditions, setConditions] = useState<string[]>([]);
  const [medications, setMedications] = useState<string[]>([]);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);
    const router = useRouter();
  const [session, setSession] = useState<any>(null);

    useEffect(() => {
  supabase.auth.getSession().then(({ data: { session } }) => {
    setSession(session);
    if (!session) {
      router.push("/login");
    }
  });

  const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
    setSession(session);
    if (!session) {
      router.push("/login");
    }
  });

  return () => {
    listener?.subscription.unsubscribe();
  };
}, [router]);

  const handleSubmit = async () => {
  // simple field validation
  if (
    !gender ||
    !dob ||
    !smoker ||
    surgeries.length === 0 ||
    conditions.length === 0 ||
    medications.length === 0 ||
    !height ||
    !weight
  ) {
    alert("Please complete all fields before submitting.");
    return;
  }
  setLoading(true);
  console.log("SET LOADING TRUE", loading);
    try {
      const res = await axios.post("https://nationallifeprotection.app.n8n.cloud/webhook/d3574086-4313-4edb-9c70-55189b2accf1", {
        gender,
        dob,
        smoker,
        surgeries,
        conditions,
        medications,
        height,
        weight,
      });
      console.log("Webhook response", res.data);
      setRecommendation(res.data);
    } catch (err) {
      console.error(err);
      setRecommendation("Error reaching underwriting genie.");
    } finally { 
      setLoading(false); // turn off the spinner
      console.log("SET LOADING FALSE", loading);
    }
  };

  const optionsStyle = {
  control: (base: any) => ({
    ...base,
    borderRadius: "0.5rem",
    borderColor: "#555",
    backgroundColor: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(4px)",
    color: "#fff",
    cursor: "pointer",
    "&:hover": { borderColor: "#888"},
    boxShadow: "none",
  }),
  input: (base: any) => ({
    ...base,
    color: "#fff",
  }),
  placeholder: (base: any) => ({
    ...base,
    color: "#ccc",
  }),
  singleValue: (base: any) => ({
    ...base,
    color: "#fff",
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#1f2937" // Tailwind's gray-800
      : state.isFocused
      ? "#374151" // Tailwind's gray-700
      : "transparent",
    color: "#fff",
  }),
  multiValue: (base: any) => ({
    ...base,
    backgroundColor: "#374151",
    color: "#fff",
    borderRadius: "0.5rem",
  }),
  multiValueLabel: (base: any) => ({
    ...base,
    color: "#fff",
  }),
  multiValueRemove: (base: any) => ({
    ...base,
    color: "#fff",
    ":hover": {
      backgroundColor: "#ef4444",
      color: "#fff",
    },
  }),
  menu: (base: any) => ({
    ...base,
    backgroundColor: "#1f2937",
    color: "#fff",
    borderRadius: "0.5rem",
    padding: "2px",
  }),
};

  const surgeryOptions = [
    { label: "Heart Bypass Surgery (CABG)", value: "Heart Bypass Surgery (CABG)" },
    { label: "Heart Valve Replacement", value: "Heart Valve Replacement" },
    { label: "Pacemaker Implantation", value: "Pacemaker Implantation" },
    { label: "Angioplasty (Stent Placement)", value: "Angioplasty (Stent Placement)" },
    { label: "Lung Surgery (Lobectomy)", value: "Lung Surgery (Lobectomy)" },
    { label: "Appendectomy", value: "Appendectomy" },
    { label: "Gallbladder Removal (Cholecystectomy)", value: "Gallbladder Removal (Cholecystectomy)" },
    { label: "Liver Resection", value: "Liver Resection" },
    { label: "Kidney Removal (Nephrectomy)", value: "Kidney Removal (Nephrectomy)" },
    { label: "Kidney Transplant", value: "Kidney Transplant" },
    { label: "Liver Transplant", value: "Liver Transplant" },
    { label: "Pancreatic Surgery", value: "Pancreatic Surgery" },
    { label: "Colon Resection (Colectomy)", value: "Colon Resection (Colectomy)" },
    { label: "Bowel Resection", value: "Bowel Resection" },
    { label: "Stomach Surgery (Gastrectomy)", value: "Stomach Surgery (Gastrectomy)" },
    { label: "C-Section (Cesarean Delivery)", value: "C-Section (Cesarean Delivery)" },
    { label: "Hysterectomy", value: "Hysterectomy" },
    { label: "Prostate Removal (Prostatectomy)", value: "Prostate Removal (Prostatectomy)" },
    { label: "Mastectomy", value: "Mastectomy" },
    { label: "Lumpectomy", value: "Lumpectomy" },
    { label: "Hip Replacement", value: "Hip Replacement" },
    { label: "Knee Replacement", value: "Knee Replacement" },
    { label: "Spinal Fusion", value: "Spinal Fusion" },
    { label: "Laminectomy", value: "Laminectomy" },
    { label: "Discectomy", value: "Discectomy" },
    { label: "Shoulder Replacement", value: "Shoulder Replacement" },
    { label: "Amputation - Leg", value: "Amputation - Leg" },
    { label: "Amputation - Arm", value: "Amputation - Arm" },
    { label: "Amputation - Foot", value: "Amputation - Foot" },
    { label: "Amputation - Hand", value: "Amputation - Hand" },
    { label: "Brain Surgery (Craniotomy)", value: "Brain Surgery (Craniotomy)" },
    { label: "Aneurysm Repair", value: "Aneurysm Repair" },
    { label: "Carotid Artery Surgery", value: "Carotid Artery Surgery" },
    { label: "Thyroidectomy", value: "Thyroidectomy" },
    { label: "Parathyroid Surgery", value: "Parathyroid Surgery" },
    { label: "Bladder Surgery", value: "Bladder Surgery" },
    { label: "Gastric Bypass", value: "Gastric Bypass" },
    { label: "Gastric Sleeve", value: "Gastric Sleeve" },
    { label: "Hernia Repair", value: "Hernia Repair" },
    { label: "Skin Graft Surgery", value: "Skin Graft Surgery" },
    { label: "Stents ( Heart / Arteries )", value: "Stents ( Heart / Arteries )" },
    { label: "Stents ( Non-Heart Related )", value: "Stents ( Non-Heart Related )" },
    { label: "None", value: "None" },
  ];

  const conditionOptions = [
    { label: "Type 1 Diabetes", value: "Type 1 Diabetes" },
    { label: "Type 2 Diabetes", value: "Type 2 Diabetes" },
    { label: "Hypertension (Within 1 year)", value: "Hypertension (Within 1 year)" },
    { label: "Hypertension (2 years ago)", value: "Hypertension (2 years ago)" },
    { label: "Hypertension (3+ years ago)", value: "Hypertension (3+ years ago)" },
    { label: "High Blood Pressure (Within 1 year)", value: "High Blood Pressure (Within 1 year)" },
    { label: "High Blood Pressure (2 years ago)", value: "High Blood Pressure (2 years ago)" },
    { label: "High Blood Pressure (3+ years ago)", value: "High Blood Pressure (3+ years ago)" },
    { label: "High Cholesterol (Within 1 year)", value: "High Cholesterol (Within 1 year)" },
    { label: "High Cholesterol (2 years ago)", value: "High Cholesterol (2 years ago)" },
    { label: "High Cholesterol (3+ years ago)", value: "High Cholesterol (3+ years ago)" },
    { label: "Heart Attack (Within 1 year)", value: "Heart Attack (Within 1 year)" },
    { label: "Heart Attack (2 years ago)", value: "Heart Attack (2 years ago)" },
    { label: "Heart Attack (3+ years ago)", value: "Heart Attack (3+ years ago)" },
    { label: "Stroke (Within 1 year)", value: "Stroke (Within 1 year)" },
    { label: "Stroke (2 years ago)", value: "Stroke (2 years ago)" },
    { label: "Stroke (3+ years ago)", value: "Stroke (3+ years ago)" },
    { label: "Transient Ischemic Attack (TIA) (Within 1 year)", value: "Transient Ischemic Attack (TIA) (Within 1 year)" },
    { label: "Transient Ischemic Attack (TIA) (2 years ago)", value: "Transient Ischemic Attack (TIA) (2 years ago)" },
    { label: "Transient Ischemic Attack (TIA) (3+ years ago)", value: "Transient Ischemic Attack (TIA) (3+ years ago)" },
    { label: "Congestive Heart Failure (Within 1 year)", value: "Congestive Heart Failure (Within 1 year)" },
    { label: "Congestive Heart Failure (2 years ago)", value: "Congestive Heart Failure (2 years ago)" },
    { label: "Congestive Heart Failure (3+ years ago)", value: "Congestive Heart Failure (3+ years ago)" },
    { label: "Arrhythmia (Within 1 year)", value: "Arrhythmia (Within 1 year)" },
    { label: "Arrhythmia (2 years ago)", value: "Arrhythmia (2 years ago)" },
    { label: "Arrhythmia (3+ years ago)", value: "Arrhythmia (3+ years ago)" },
    { label: "Coronary Artery Disease (Within 1 year)", value: "Coronary Artery Disease (Within 1 year)" },
    { label: "Coronary Artery Disease (2 years ago)", value: "Coronary Artery Disease (2 years ago)" },
    { label: "Coronary Artery Disease (3+ years ago)", value: "Coronary Artery Disease (3+ years ago)" },
    { label: "Atrial Fibrillation (Within 1 year)", value: "Atrial Fibrillation (Within 1 year)" },
    { label: "Atrial Fibrillation (2 years ago)", value: "Atrial Fibrillation (2 years ago)" },
    { label: "Atrial Fibrillation (3+ years ago)", value: "Atrial Fibrillation (3+ years ago)" },
    { label: "Pacemaker (Within 1 year)", value: "Pacemaker (Within 1 year)" },
    { label: "Pacemaker (2 years ago)", value: "Pacemaker (2 years ago)" },
    { label: "Pacemaker (3+ years ago)", value: "Pacemaker (3+ years ago)" },
    { label: "Bypass Surgery (Within 1 year)", value: "Bypass Surgery (Within 1 year)" },
    { label: "Bypass Surgery (2 years ago)", value: "Bypass Surgery (2 years ago)" },
    { label: "Bypass Surgery (3+ years ago)", value: "Bypass Surgery (3+ years ago)" },
    { label: "Angioplasty (Within 1 year)", value: "Angioplasty (Within 1 year)" },
    { label: "Angioplasty (2 years ago)", value: "Angioplasty (2 years ago)" },
    { label: "Angioplasty (3+ years ago)", value: "Angioplasty (3+ years ago)" },
    { label: "COPD (Within 1 year)", value: "COPD (Within 1 year)" },
    { label: "COPD (2 years ago)", value: "COPD (2 years ago)" },
    { label: "COPD (3+ years ago)", value: "COPD (3+ years ago)" },
    { label: "Asthma", value: "Asthma" },
    { label: "Emphysema", value: "Emphysema" },
    { label: "Sleep Apnea", value: "Sleep Apnea" },
    { label: "Lung Cancer (Within 1 year)", value: "Lung Cancer (Within 1 year)" },
    { label: "Lung Cancer (2 years ago)", value: "Lung Cancer (2 years ago)" },
    { label: "Lung Cancer (3+ years ago)", value: "Lung Cancer (3+ years ago)" },
    { label: "Thyroid Disorder (Within 1 year)", value: "Thyroid Disorder (Within 1 year)" },
    { label: "Thyroid Disorder (2 years ago)", value: "Thyroid Disorder (2 years ago)" },
    { label: "Thyroid Disorder (3+ years ago)", value: "Thyroid Disorder (3+ years ago)" },
    { label: "Cancer (Within 1 year)", value: "Cancer (Within 1 year)" },
    { label: "Cancer (2 years ago)", value: "Cancer (2 years ago)" },
    { label: "Cancer (3+ years ago)", value: "Cancer (3+ years ago)" },
    { label: "Liver Disease (Within 1 year)", value: "Liver Disease (Within 1 year)" },
    { label: "Liver Disease (2 years ago)", value: "Liver Disease (2 years ago)" },
    { label: "Liver Disease (3+ years ago)", value: "Liver Disease (3+ years ago)" },
    { label: "Kidney Disease (Within 1 year)", value: "Kidney Disease (Within 1 year)" },
    { label: "Kidney Disease (2 years ago)", value: "Kidney Disease (2 years ago)" },
    { label: "Kidney Disease (3+ years ago)", value: "Kidney Disease (3+ years ago)" },
    { label: "Arthritis (Within 1 year)", value: "Arthritis (Within 1 year)" },
    { label: "Arthritis (2 years ago)", value: "Arthritis (2 years ago)" },
    { label: "Arthritis (3+ years ago)", value: "Arthritis (3+ years ago)" },
    { label: "Rheumatoid Arthritis", value: "Rheumatoid Arthritis" },
    { label: "Neuropathy", value: "Neuropathy" },
    { label: "Multiple Sclerosis (MS)", value: "Multiple Sclerosis (MS)" },
    { label: "Parkinson Disease", value: "Parkinson Disease" },
    { label: "Alzheimer Disease", value: "Alzheimer Disease" },
    { label: "Dementia", value: "Dementia" },
    { label: "Seizures", value: "Seizures" },
    { label: "Epilepsy", value: "Epilepsy" },
    { label: "Depression", value: "Depression" },
    { label: "Anxiety", value: "Anxiety" },
    { label: "Bipolar Disorder", value: "Bipolar Disorder" },
    { label: "Schizophrenia", value: "Schizophrenia" },
    { label: "HIV/AIDS", value: "HIV/AIDS" },
    { label: "None", value: "None" }
  ];

  const medicationOptions = [
    { label: "Atorvastatin", value: "Atorvastatin" },
    { label: "Simvastatin", value: "Simvastatin" },
    { label: "Rosuvastatin", value: "Rosuvastatin" },
    { label: "Pravastatin", value: "Pravastatin" },
    { label: "Lovastatin", value: "Lovastatin" },
    { label: "Lisinopril", value: "Lisinopril" },
    { label: "Enalapril", value: "Enalapril" },
    { label: "Ramipril", value: "Ramipril" },
    { label: "Benazepril", value: "Benazepril" },
    { label: "Losartan", value: "Losartan" },
    { label: "Valsartan", value: "Valsartan" },
    { label: "Olmesartan", value: "Olmesartan" },
    { label: "Telmisartan", value: "Telmisartan" },
    { label: "Amlodipine", value: "Amlodipine" },
    { label: "Nifedipine", value: "Nifedipine" },
    { label: "Diltiazem", value: "Diltiazem" },
    { label: "Verapamil", value: "Verapamil" },
    { label: "Metoprolol", value: "Metoprolol" },
    { label: "Atenolol", value: "Atenolol" },
    { label: "Carvedilol", value: "Carvedilol" },
    { label: "Propranolol", value: "Propranolol" },
    { label: "Hydrochlorothiazide", value: "Hydrochlorothiazide" },
    { label: "Chlorthalidone", value: "Chlorthalidone" },
    { label: "Furosemide", value: "Furosemide" },
    { label: "Bumetanide", value: "Bumetanide" },
    { label: "Digoxin", value: "Digoxin" },
    { label: "Isosorbide Mononitrate", value: "Isosorbide Mononitrate" },
    { label: "Nitroglycerin", value: "Nitroglycerin" },
    { label: "Amiodarone", value: "Amiodarone" },
    { label: "Clonidine", value: "Clonidine" },
    { label: "Metformin", value: "Metformin" },
    { label: "Glipizide", value: "Glipizide" },
    { label: "Glyburide", value: "Glyburide" },
    { label: "Sitagliptin", value: "Sitagliptin" },
    { label: "Linagliptin", value: "Linagliptin" },
    { label: "Pioglitazone", value: "Pioglitazone" },
    { label: "Insulin Glargine", value: "Insulin Glargine" },
    { label: "Insulin Lispro", value: "Insulin Lispro" },
    { label: "Insulin Aspart", value: "Insulin Aspart" },
    { label: "Semaglutide", value: "Semaglutide" },
    { label: "Liraglutide", value: "Liraglutide" },
    { label: "Exenatide", value: "Exenatide" },
    { label: "Levemir", value: "Levemir" },
    { label: "Novolog", value: "Novolog" },
    { label: "Humalog", value: "Humalog" },
    { label: "Tresiba", value: "Tresiba" },
    { label: "Toujeo", value: "Toujeo" },
    { label: "Sertraline", value: "Sertraline" },
    { label: "Fluoxetine", value: "Fluoxetine" },
    { label: "Citalopram", value: "Citalopram" },
    { label: "Escitalopram", value: "Escitalopram" },
    { label: "Paroxetine", value: "Paroxetine" },
    { label: "Venlafaxine", value: "Venlafaxine" },
    { label: "Duloxetine", value: "Duloxetine" },
    { label: "Bupropion", value: "Bupropion" },
    { label: "Amitriptyline", value: "Amitriptyline" },
    { label: "Nortriptyline", value: "Nortriptyline" },
    { label: "Trazodone", value: "Trazodone" },
    { label: "Mirtazapine", value: "Mirtazapine" },
    { label: "Quetiapine", value: "Quetiapine" },
    { label: "Olanzapine", value: "Olanzapine" },
    { label: "Risperidone", value: "Risperidone" },
    { label: "Aripiprazole", value: "Aripiprazole" },
    { label: "Haloperidol", value: "Haloperidol" },
    { label: "Lithium", value: "Lithium" },
    { label: "Alprazolam", value: "Alprazolam" },
    { label: "Clonazepam", value: "Clonazepam" },
    { label: "Lorazepam", value: "Lorazepam" },
    { label: "Diazepam", value: "Diazepam" },
    { label: "Buspirone", value: "Buspirone" },
    { label: "Hydroxyzine", value: "Hydroxyzine" },
    { label: "Gabapentin", value: "Gabapentin" },
    { label: "Pregabalin", value: "Pregabalin" },
    { label: "Topiramate", value: "Topiramate" },
    { label: "Phenytoin", value: "Phenytoin" },
    { label: "Levetiracetam", value: "Levetiracetam" },
    { label: "Lamotrigine", value: "Lamotrigine" },
    { label: "Valproic Acid", value: "Valproic Acid" },
    { label: "Carbamazepine", value: "Carbamazepine" },
    { label: "Phenobarbital", value: "Phenobarbital" },
    { label: "Donepezil", value: "Donepezil" },
    { label: "Memantine", value: "Memantine" },
    { label: "Ropinirole", value: "Ropinirole" },
    { label: "Pramipexole", value: "Pramipexole" },
    { label: "Entacapone", value: "Entacapone" },
    { label: "Selegiline", value: "Selegiline" },
    { label: "Amantadine", value: "Amantadine" },
    { label: "Clobazam", value: "Clobazam" },
    { label: "Tiagabine", value: "Tiagabine" },
    { label: "Tramadol", value: "Tramadol" },
    { label: "Oxycodone", value: "Oxycodone" },
    { label: "Hydrocodone", value: "Hydrocodone" },
    { label: "Morphine", value: "Morphine" },
    { label: "Fentanyl", value: "Fentanyl" },
    { label: "Methadone", value: "Methadone" },
    { label: "Buprenorphine", value: "Buprenorphine" },
    { label: "Codeine", value: "Codeine" },
    { label: "Hydromorphone", value: "Hydromorphone" },
    { label: "Tapentadol", value: "Tapentadol" },
    { label: "Nalbuphine", value: "Nalbuphine" },
    { label: "Cyclobenzaprine", value: "Cyclobenzaprine" },
    { label: "Tizanidine", value: "Tizanidine" },
    { label: "Baclofen", value: "Baclofen" },
    { label: "Ketorolac", value: "Ketorolac" },
    { label: "Celecoxib", value: "Celecoxib" },
    { label: "Diclofenac", value: "Diclofenac" },
    { label: "Amoxicillin", value: "Amoxicillin" },
    { label: "Penicillin", value: "Penicillin" },
    { label: "Cephalexin", value: "Cephalexin" },
    { label: "Cefdinir", value: "Cefdinir" },
    { label: "Ceftriaxone", value: "Ceftriaxone" },
    { label: "Clindamycin", value: "Clindamycin" },
    { label: "Azithromycin", value: "Azithromycin" },
    { label: "Erythromycin", value: "Erythromycin" },
    { label: "Doxycycline", value: "Doxycycline" },
    { label: "Minocycline", value: "Minocycline" },
    { label: "Ciprofloxacin", value: "Ciprofloxacin" },
    { label: "Levofloxacin", value: "Levofloxacin" },
    { label: "Moxifloxacin", value: "Moxifloxacin" },
    { label: "Trimethoprim/Sulfamethoxazole", value: "Trimethoprim/Sulfamethoxazole" },
    { label: "Nitrofurantoin", value: "Nitrofurantoin" },
    { label: "Metronidazole", value: "Metronidazole" },
    { label: "Linezolid", value: "Linezolid" },
    { label: "Vancomycin", value: "Vancomycin" },
    { label: "Rifampin", value: "Rifampin" },
    { label: "Isoniazid", value: "Isoniazid" },
    { label: "Ethambutol", value: "Ethambutol" },
    { label: "Acyclovir", value: "Acyclovir" },
    { label: "Valacyclovir", value: "Valacyclovir" },
    { label: "Famciclovir", value: "Famciclovir" },
    { label: "Oseltamivir", value: "Oseltamivir" },
    { label: "Zanamivir", value: "Zanamivir" },
    { label: "Remdesivir", value: "Remdesivir" },
    { label: "None", value: "None" }
  ];
  const heightOptions = [
    ...Array.from({ length: 37 }, (_, i) => `${4 + Math.floor(i / 12)}'${i % 12}"`),
  ].map((h) => ({ label: h, value: h }));

  const weightOptions = [
    ...Array.from({ length: 351 }, (_, i) => `${i + 50} lbs`),
  ].map((w) => ({ label: w, value: w }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 p-8">
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl space-y-6 border border-white/20 text-white">
        {/* SCRIPT SECTION */}
        <div className="text-white space-y-4">
          <h2 className="text-xl font-bold">INTRO & BRANDING</h2>
          <p>
            1. Hey [Client], this is [Agent] with National Life, I’m the licensed underwriter
            assigned to your request for the State-approved life insurance programs.
            You listed [Beneficiary] — does that ring a bell?
          </p>
          <p className="italic text-gray-300">
            *If needed - It looks like you responded to one of the forms on YouTube where you
            listed [Beneficiary] as the beneficiary.
          </p>
          <p>
            2. Great, just so I’m clear — were you mainly looking to leave something behind for
            the family or just cover final expenses like funeral costs? And are you leaning toward
            a burial or cremation?
          </p>

          <h2 className="text-xl font-bold mt-4">EXPLAINING THE PROCESS</h2>
          <p>
            Okay, here’s how this works — and I’ll keep it simple: I’m what’s called a Medical
            Field Underwriter. My job is to help you figure out which options you qualify for based
            on your age and health. Then, I shop around over 26 carriers that are approved in your
            state to find the best match with the best rate and approval odds.
          </p>
          <p>
            Everything is non-medical — no doctors, no needles, no in-home visits.
            We do this all over the phone.
          </p>
          <p className="font-bold">Sound good?</p>

          <h2 className="text-xl font-bold mt-4">MEDICAL QUALIFYING</h2>
          <p>Let’s go through a few quick health questions:</p>
        </div>

        {/* HEALTH FORM */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-2 font-medium text-white/90" >Gender:</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full border rounded-lg p-2 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-white/10 backdrop-blur-md placeholder:text-gray-400"
              >
                <option value="">-- Select Gender --</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-medium text-white/90" >Date of Birth:</label>
              <InputMask
                mask="99/99/9999"
                placeholder="MM/DD/YYYY"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              >
                {(inputProps) => (
                  <input
                    {...inputProps}
                    className="w-full border rounded-lg p-2 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-white/10 backdrop-blur-md placeholder:text-gray-400"
                  />
                )}
              </InputMask>
            </div>
            <div>
              <label className="block mb-2 font-medium text-white/90" >Smoked in the last 6 months?</label>
              <select
                value={smoker}
                onChange={(e) => setSmoker(e.target.value)}
                className="w-full border rounded-lg p-2 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-white/10 backdrop-blur-md cursor-pointer"
              >
                <option value="">-- Select --</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium text-white/90" >Any major surgeries in the last 3 years?</label>
            <CreatableSelect
              isMulti
              options={surgeryOptions}
              value={surgeries.map((s) => ({ label: s, value: s }))}
              onChange={(selected) => setSurgeries(selected.map((s) => s.value))}
              styles={optionsStyle}
              placeholder="Select or type surgery..."
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-white/90" >Have you ever had any of the following?</label>
            <CreatableSelect
              isMulti
              options={conditionOptions}
              value={conditions.map((c) => ({ label: c, value: c }))}
              onChange={(selected) => setConditions(selected.map((c) => c.value))}
              styles={optionsStyle}
              placeholder="Select or type condition..."
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-white/90" >
              Are there any other medications you are currently taking?
            </label>
            <CreatableSelect
              isMulti
              options={medicationOptions}
              value={medications.map((m) => ({ label: m, value: m }))}
              onChange={(selected) => setMedications(selected.map((m) => m.value))}
              styles={optionsStyle}
              placeholder="Select or type medication..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium text-white/90" >Height:</label>
              <Select
                options={heightOptions}
                value={height ? { label: height, value: height } : null}
                onChange={(selected) => setHeight(selected?.value || "")}
                styles={optionsStyle}
                placeholder="Select or type height..."
                isSearchable
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-white/90" >Weight:</label>
              <Select
                options={weightOptions}
                value={weight ? { label: weight, value: weight } : null}
                onChange={(selected) => setWeight(selected?.value || "")}
                styles={optionsStyle}
                placeholder="Select or type weight..."
                isSearchable
              />
            </div>
          </div>
<button
  onClick={handleSubmit}
  disabled={loading}
  className={`${
    loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#22c55e] hover:bg-[#16a34a] active:bg-green-800 cursor-pointer"
  } transition-all duration-200 text-black text-base font-semibold tracking-wide px-6 py-3 rounded-full shadow mt-4 focus:ring-4 focus:ring-green-300 flex items-center justify-center`}
>
  {loading ? (
    <span className="flex items-center space-x-2">
      <svg
        className="animate-spin h-5 w-5 text-black"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      <span>Loading...</span>
    </span>
  ) : (
    "Ask CRÈME"
  )}
</button>

          {recommendation && (
            <div className="border p-4 bg-green-800/20 text-green-200 rounded-lg mt-4 border-green-500/30">
              {recommendation}
            </div>
          )}
          {/* SECOND HALF SCRIPT SECTION */}
          <div className="text-white-800 space-y-4 mt-8">
            <h2 className="text-xl font-bold">CREDIBILITY & COMPLIANCE</h2>
            <p>
              Awesome. GO AHEAD and grab a pen and paper real quick.
              Let me know when you're ready... Perfect.
              My name is [Full Name] — that’s [Spell It]. My state license number is [Number].
              You can verify me directly on your state’s Department of Insurance website.
              State requires I leave that information with you.
            </p>

            <h2 className="text-xl font-bold mt-4">DIGGING DEEP – FINDING THE WHY</h2>
            <p>
              Let me ask you something important:{" "}
              <span className="font-bold underline">(I don't mean to get too dark here but..) Who would be the one to get that call when something happens to you?</span>
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>What made you decide now’s the time to look into life insurance?</li>
              <li>Do you currently have any coverage in place?</li>
              <li>What has stopped you in the past from getting coverage for [Beneficiary]?</li>
              <li>If something were to happen tomorrow, would [Beneficiary] be able to afford the funeral or expenses out of pocket?</li>
            </ul>
            <p>
              Recap what they told you and get agreement:
              <span className="font-semibold">
                {" "}
                "So based on what you said, you want something reliable that helps [Beneficiary]
                and gives you peace of mind — would you agree having something is better than nothing?"
              </span>
            </p>

            <h2 className="text-xl font-bold mt-4">CARRIER SETUP & BANK INFO</h2>
            <p>
              While I pull your options, let me explain what we’re looking at:
              Real Quick, I may be able to get you an additional incentive here..
              Many carriers offer state-specific discounts and even banking discounts if you bank with one of their familiar or preferred partners.
              What's the name of the bank you use? (Awesome)
            </p>
            <p>
              The company most likely to approve you is called [Carrier Name].
              They’ve been around for nearly 100 years and have never missed a payout claim.
              They offer 4 huge benefits given your situation..
            </p>

            <h2 className="text-xl font-bold mt-4">PROGRAM BENEFITS – GET THE PEN READY AGAIN</h2>
            <p>Let’s write these down — this program comes with 4 huge benefits:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Never Expires – Coverage is permanent. It never goes away or increases in price due to age.</li>
              <li>Cash Value Savings – Builds up over time like a savings account (about 5% growth).</li>
              <li>Living Benefits – If you're diagnosed with something serious like a heart attack or terminal illness, they’ll send you up to 50% of the benefit while you're alive.</li>
              <li>Accidental Death – Whatever benefit amount you choose doubles in case of accidental death — car crash, fall, etc.</li>
            </ul>

            <h2 className="text-xl font-bold mt-4">QUOTE & OPTIONS – DO NOT PAUSE</h2>
            <p>
              Here are the 3 options:{" "}
              <span className="italic">(CHEAPEST OPTION SHOULD BE NO LESS THAN $80/month - You can always move down if client objects to cost)</span>
            </p>
            <ol className="list-decimal pl-6 space-y-1">
              <li>Option #1 BENEFITS and then give a price. DO NOT PAUSE</li>
              <li>Option #2 BENEFITS and then give a price.</li>
              <li>Option #3 (give Lowest amount) BENEFITS and then give a price.</li>
            </ol>
            <p>
              Most of my clients typically go for the middle option but if you were able to qualify, which of those three
              makes the most sense based on your current situation?
            </p>
            <p>
              (If they pick one):{" "}
              <span className="italic">(PIVOT RIGHT INTO APP QUESTION)</span> “Okay great what's a good address to get your policy packet sent out to?”
            </p>

            <h2 className="text-xl font-bold mt-4">SSN & PAYMENT COLLECTION</h2>
            <p>Now the carrier will run a quick prescription check — what’s your Social?</p>
            <p>
              ACCOUNT NUMBER: Most of my clients receive their income on the 1st or 3rd of every month while some others
              receive it on the 2nd, 3rd or 4th WEDNESDAY of every month. Which day do you receive yours?
            </p>
            <p>
              Perfect, now because you bank with one of THEIR preferred partners I have the routing number here in the system already.
              I just need you to go ahead & grab something that has your routing number real quick so I can confirm this is accurate..
              Let me know when you're ready.
            </p>
            <p>
              (Check, bank statement, online account) Awesome, the routing is XXX-XX-XXXX correct?
              Perfect, and then lastly just go ahead with the account number.
            </p>
            <p>
              <span className="font-semibold">IF THEY OBJECT:</span> I appreciate your transparency in letting me know, Every insurance company
              requires an account to be on file for your application, so that if it gets approved, this is the account that would be used
              to pay for the premium each month. If it doesn’t get approved, nothing comes out. So we’re just trying to submit this to
              see if we can at least get you approved today. Go ahead with the account number whenever you’re ready.
            </p>

            <h2 className="text-xl font-bold mt-4">POST CLOSE</h2>
            <p>
              GREAT NEWS! You’re approved - Write down policy # + Company Name / DRAW DATE.
              A packet will come out in 7-10 business days, I advise when the packet comes to put it in a safe,
              safety deposit, or hiding spot where it won't be lost.
            </p>
            <p>
              I would also advise to contact your beneficiary and inform them that they are now on your policy and share my contact
              information if god forbid you are not able to get in touch in any circumstance.
            </p>
            <p>
              Here at (Agency) we don't sell off your information on the secondary market - It's in our best interest to protect you.
              Many people prey on seniors and they will call you and try all types of things. Please do not fall for these tricks.
            </p>
            <p>
              After this call you may or may not receive a text link for a review on your experience with me.
              When you find the time if you could fill it out it would be greatly appreciated so you can brag about your experience to the world!
              Thank you, I'm your #1 contact, and I appreciate the conversation today.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

