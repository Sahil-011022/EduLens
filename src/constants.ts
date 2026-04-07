export const STUDENTS_MOCK = [
  {id:"s1",name:"Rohan Kumar",   grade:"10-A",attendance:61,submissions:55,scores:{Math:42,Physics:55,English:70,Chemistry:48,History:65},topicScores:{Algebra:35,Calculus:48,Trigonometry:42,Mechanics:55,Thermodynamics:58,Grammar:72,Literature:68,Bonding:45,Reactions:52,Geography:65}},
  {id:"s2",name:"Sara Patel",    grade:"9-B", attendance:74,submissions:72,scores:{Math:70,Physics:54,English:80,Chemistry:62,History:75},topicScores:{Algebra:72,Calculus:68,Trigonometry:65,Mechanics:52,Thermodynamics:56,Grammar:82,Literature:78,Bonding:60,Reactions:64,Geography:76}},
  {id:"s3",name:"Arjun Mehta",   grade:"11-C",attendance:55,submissions:48,scores:{Math:38,Physics:40,English:55,Chemistry:35,History:50},topicScores:{Algebra:30,Calculus:38,Trigonometry:35,Mechanics:40,Thermodynamics:42,Grammar:55,Literature:52,Bonding:33,Reactions:38,Geography:50}},
  {id:"s4",name:"Neha Yadav",    grade:"10-B",attendance:78,submissions:80,scores:{Math:59,Physics:66,English:72,Chemistry:58,History:78},topicScores:{Algebra:58,Calculus:55,Trigonometry:62,Mechanics:64,Thermodynamics:68,Grammar:74,Literature:70,Bonding:56,Reactions:60,Geography:79}},
  {id:"s5",name:"Vikram Singh",  grade:"9-A", attendance:92,submissions:95,scores:{Math:82,Physics:78,English:88,Chemistry:80,History:85},topicScores:{Algebra:85,Calculus:80,Trigonometry:83,Mechanics:78,Thermodynamics:76,Grammar:90,Literature:86,Bonding:82,Reactions:79,Geography:85}},
  {id:"s6",name:"Meera Shah",    grade:"11-A",attendance:85,submissions:88,scores:{Math:65,Physics:70,English:74,Chemistry:68,History:72},topicScores:{Algebra:64,Calculus:62,Trigonometry:68,Mechanics:72,Thermodynamics:70,Grammar:76,Literature:72,Bonding:66,Reactions:70,Geography:74}},
];

export const ATTENDANCE_DATA_MOCK = {
  "2026-04-01":{s1:true,s2:true,s3:false,s4:true,s5:true,s6:true},
  "2026-04-02":{s1:false,s2:true,s3:false,s4:true,s5:true,s6:false},
  "2026-04-03":{s1:true,s2:false,s3:true,s4:false,s5:true,s6:true},
  "2026-04-04":{s1:true,s2:true,s3:false,s4:true,s5:true,s6:true},
  "2026-04-07":{s1:false,s2:true,s3:false,s4:true,s5:true,s6:true},
};

export const ASSIGNMENTS_MOCK = [
  {id:"a1",title:"Algebra Problem Set",subject:"Math",due:"2026-04-05",submissions:{s1:true,s2:true,s3:false,s4:true,s5:true,s6:true}},
  {id:"a2",title:"Physics Lab Report",subject:"Physics",due:"2026-04-06",submissions:{s1:false,s2:true,s3:false,s4:false,s5:true,s6:true}},
  {id:"a3",title:"English Essay",subject:"English",due:"2026-04-07",submissions:{s1:true,s2:true,s3:true,s4:true,s5:true,s6:false}},
  {id:"a4",title:"Chemistry Worksheet",subject:"Chemistry",due:"2026-04-08",submissions:{s1:false,s2:false,s3:false,s4:true,s5:true,s6:true}},
];

export const masteryLabel = (score: number) => {
  if(score>=80) return "low"; // Using the pill classes from CSS
  if(score>=55) return "med";
  return "high";
};

export const masteryText = (score: number) => {
  if(score>=80) return "Mastered";
  if(score>=55) return "Developing";
  return "Needs Work";
};

export const riskScore = (s: any) => {
  const scores = Object.values(s.scores) as number[];
  const avg = scores.reduce((a,b)=>a+b,0)/scores.length;
  const raw = (avg/100)*40 + (s.attendance/100)*35 + (s.submissions/100)*25;
  const pct = Math.round(raw);
  if(pct<40) return {level:"HIGH",score:pct};
  if(pct<70) return {level:"MED",score:pct};
  return {level:"LOW",score:pct};
};

export const avgScore = (s: any) => { 
  const v = Object.values(s.scores) as number[]; 
  return Math.round(v.reduce((a,b)=>a+b,0)/v.length); 
};

export const weakSubject = (s: any) => { 
  return Object.entries(s.scores).sort((a: any, b: any) => a[1] - b[1])[0][0]; 
};

export const barColor = (v: number) => { 
  return v < 50 ? "var(--red-brand)" : v < 65 ? "var(--amber-brand)" : "var(--mint)"; 
};

export const avatarColor = (i: number) => { 
  const c = ["#e24b4a", "#f4a261", "#38bdf8", "#02c39a", "#818cf8", "#f87171"]; 
  return c[i % c.length]; 
};
