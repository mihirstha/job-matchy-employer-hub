import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Check, Plus, Video, Save, Search, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EnhancedJobPostingFormProps {
  onCancel: () => void;
  onSuccess: () => void;
  templateId?: string | null;
}

export function EnhancedJobPostingForm({ onCancel, onSuccess, templateId = null }: EnhancedJobPostingFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [requireVideoResume, setRequireVideoResume] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(templateId);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [skillSearchQuery, setSkillSearchQuery] = useState("");
  const [customSkill, setCustomSkill] = useState("");
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedArea, setSelectedArea] = useState<string>("");
  const { toast } = useToast();
  const totalSteps = 4;
  
  // Sample job templates
  const templates = [
    { id: "template1", title: "Frontend Developer", description: "Template for hiring React developers" },
    { id: "template2", title: "UI/UX Designer", description: "Template for hiring design professionals" },
    { id: "template3", title: "Backend Engineer", description: "Template for hiring Node.js developers" },
  ];
  
  // Sample available skills
  const availableSkills = [
    // Tech skills
    "React", "JavaScript", "TypeScript", "HTML", "CSS", "Node.js", "Python", "Java", "C#", "PHP",
    "SQL", "MongoDB", "PostgreSQL", "MySQL", "GraphQL", "REST API", "AWS", "Azure", "Docker", "Kubernetes",
    "Git", "CI/CD", "Redux", "Vue.js", "Angular", "Next.js", "Express", "Django", "Flask", "Spring Boot",
    "Mobile Development", "iOS", "Android", "React Native", "Flutter", "Swift", "Kotlin",
    
    // Design skills
    "UI Design", "UX Design", "Figma", "Adobe XD", "Sketch", "Photoshop", "Illustrator", "InDesign", 
    "Prototyping", "Wireframing", "User Research", "Usability Testing", "Design Systems", "Design Thinking",
    
    // General skills
    "Project Management", "Agile", "Scrum", "Communication", "Leadership", "Problem Solving", 
    "Critical Thinking", "Teamwork", "Time Management", "Organization", "Adaptability", "Creativity",
    
    // Business skills
    "Marketing", "Sales", "Customer Service", "Business Analysis", "Data Analysis", "SEO", "SEM", 
    "Social Media", "Content Creation", "Copywriting", "Public Relations", "Market Research"
  ];
  
  // Skill categories for better organization
  const skillCategories = [
    { name: "Technical", skills: ["React", "JavaScript", "TypeScript", "HTML", "CSS", "Node.js", "Python", "Java"] },
    { name: "Design", skills: ["UI Design", "UX Design", "Figma", "Adobe XD", "Sketch", "Photoshop"] },
    { name: "Soft Skills", skills: ["Communication", "Leadership", "Problem Solving", "Teamwork"] },
    { name: "Business", skills: ["Marketing", "Sales", "Customer Service", "Business Analysis"] },
  ];
  
  // Nepal location data
  const locationData = {
    "Bagmati Province": {
      "Banepa": ["Banepa Chowk Area", "Basghari Area", "Bhainsepati Area", "Budol Area", "Chandeshwori Temple Area", "Dhulikhel Area", "Kathmandu University Area", "Nala", "Naya Basti Area", "Sanga", "Tindobato Area", "Ugratara Janagal Bus Stop Area"],
      "Bhaktapur": ["Balkot Area", "Biruwa Buspark Area", "Bode", "Duwakot", "Gaththaghar Area", "Jagati Area", "Kamalbinayak Area", "Katunje Area", "Kausaltar Area", "Kharipati", "Lohakanthali Area", "New Thimi", "Old Thimi", "Palanse", "Sallaghari Area", "Sano Thimi Area", "Sirutar", "Suryabinayak Area"],
      "Bharatpur": ["Airport Area", "Barhaghare Area", "Basant Chowk Area", "Baseni Area", "Belchowk Area", "Bhojad Area", "Birendra Campus Area", "Buspark Area", "Cancer Hospital Area", "Champa Chaur Area", "Chanauli", "Chaubiskoti Area", "Fulbari", "Furti Chowk", "Gauriganj Area", "Hakim Chowk Area", "Indradev Marga Area", "Jalma Hall Area", "Jugedi Area", "Junhall Road", "Kamal Nagar Area", "Krishnapur Area", "Lankhu Area", "Lions Chowk Area", "Mangalpur", "Munal Chowk Area", "Narayani Path Area", "Paras Buspark Area", "Pokhara Buspark Area", "Putalisadak Area"],
      "Bhimeshwor - Charikot": ["Dolakha Bazar Area", "Charihang"],
      "Bidur": ["Buspark Chowk", "Bidur Chowk", "Colony Area", "Trishuli Bazar"],
      "Hetauda": ["Bastipur", "Buddha Chowk", "Cement Factory Area", "Chauki Tole Area", "China Quarters Area", "Eye Hospital Area", "Forestry Institute Area", "Hatiya - Chisapani Area", "Hetauda Bus Park Area", "Hetauda Industrial Estate", "Hupra Chaur Area", "Kamal Dada", "Kamane", "Makwanpur Campus Area", "Manahari Bazar", "Nawalpur", "Padam Pokhari", "Rajaiya", "Ratomate Bazar Area", "Sanopokhara Area", "Seema Chowk Area", "TCN Area", "Thana Bharyang Area", "Unilever Factory Area"],
      "Kalika": ["Gunjaman Singh Memorial Hospital Area", "Jutpani Chowk", "Jirauna Chowk", "Kholesimal", "Subba Chowk"],
      "Kathmandu Metro 1 - Naxal Area": ["Durbarmarg", "Naxal Bhagwati Bahal Area", "Naxal Narayan Chour"],
      "Kathmandu Metro 10 - New Baneshwor Area": ["Apex College Area - Pipal Bot", "Bijuli Bazar", "Ekta Marg", "New Baneshwor Chowk", "Ratna Rajya Area", "Shankhamul Area", "Thapagaun Area", "People's Dental Campus Area", "Sorhakhutte"],
      "Kathmandu Metro 11 - Maitighar Area": ["Babarmahal", "Maitighar"],
      "Kathmandu Metro 12 - Teku Area": ["Teku", "Thapathali", "Tripureshwor"],
      "Kathmandu Metro 13 - Kalimati Area": ["Bafal", "Kalimati", "Soalteemode", "Tahachal"],
      "Kathmandu Metro 14 - Kuleshwor Area": ["Balkhu", "Kuleshwor", "Ravi Bhawan"],
      "Kathmandu Metro 15 - Swayambhu Area": ["Bahiti", "Chhauni", "Dallu", "Swayambhu - Bhuikhel"],
      "Kathmandu Metro 16 - Nayabazar Area": ["Balaju - Bypass", "Balaju Chowk", "Balaju - Machha Pokhari", "Balaju Chauki", "Banasthali", "Banasthali Dhungedhara", "Kaldhara", "Khusibu", "Kimdol", "Paknajol", "Sobhabhagawati", "Tankeshwor"],
      "Kathmandu Metro 17 - Chhetrapati Area": ["Chhetrapati", "Dhalko", "Dhobichaur", "Bijeshwori"],
      "Kathmandu Metro 18 - Raktakali Area": ["Bhurungkhel", "Raktakali"],
      "Kathmandu Metro 19 - Hanumandhoka Area": ["Hanumandhoka", "Tamsipakha"],
      "Kathmandu Metro 2 - Lazimpat Area": ["Lazimpat", "Pabitra Workshop Area"],
      "Kathmandu Metro 20 - Marutol Area": ["Hattisar Area", "Marutole"],
      "Kathmandu Metro 21 - Lagantole Area": ["Lagantole"],
      "Kathmandu Metro 22 - Newroad Area": ["Khichhapokhari", "Newroad"],
      "Kathmandu Metro 23 - Basantapur Area": ["Naradevi", "Basantapur"],
      "Kathmandu Metro 24 - Indrachowk Area": ["Kilagal", "Indrachowk"],
      "Kathmandu Metro 25 - Ason Area": ["Kapurdhara", "Ason"],
      "Kathmandu Metro 26 - Samakhusi Area": ["Gongabu Chowk", "Samakhusi"],
      "Kathmandu Metro 26 - Thamel Area": ["Galkhopakha", "Thamel"],
      "Kathmandu Metro 27 - Bhotahiti Area": ["Bhotahiti"],
      "Kathmandu Metro 28 - Bagbazar Area": ["Bagbazar"],
      "Kathmandu Metro 28 - Kamaladi Area": ["Bir Hospital", "Kamaladi"],
      "Kathmandu Metro 29 - Anamnagar Area": ["Anamnagar", "Ghattekulo"],
      "Kathmandu Metro 29 - Putalisadak Area": ["Bhaktapur Buspark", "Putalisadak"],
      "Kathmandu Metro 3 - Baluwatar Area": ["Baluwatar", "Lamtangin Marg"],
      "Kathmandu Metro 30 - Maitidevi Area": ["Dhobichaur", "Maitidevi"],
      "Kathmandu Metro 31 - Min Bhawan Area": ["Dillibazar Pipalbot", "Min Bhawan"],
      "Kathmandu Metro 32 - Koteshwor Area": ["Aloknagar", "Koteshwor Chowk"],
      "Kathmandu Metro 32 - Tinkune Area": ["Jadibuti Area", "Tinkune"],

      "Kathmandu Metro 4 - Bishalnagar Area": ["Basundhara (inside ringroad area)", "Bishalnagar"],
      "Kathmandu Metro 5 - Tangal Area": ["Bhatbhateni", "Tangal"],
      "Kathmandu Metro 7 - Chabahil Area": ["Chabahil Chowk", "Narayan Gopal Chowk Area"],
      "Kathmandu Metro 8 - Gaushala Area": ["Gaushala", "Chandol"],
      "Kathmandu Metro 9 - Sinamangal Area": ["Airport", "Handigaun", "Chuchepati", "Jayabageshwori", "Battisputali", "Sinamangal"],
      "Kathmandu Outside Ring Road": ["28 Kilo Area", "Jyamire", "Parsa Chaubiskoti", "36 Kilo Area", "Jwagal Area", "Bakhundole Area", "Bagdole Area", "Bich Bazar", "Bhandari Gaun", "Bhandara", "Bakular", "Army Camp Gate", "Cp Chowk", "Kharibot", "Aapghari", "Khurkhure", "Chitrasari Area", "Campus Stop Area"],
      "Khairehani": ["Hattichowk Area"],
      "Lalitpur Inside Ring Road": ["Ward 1 - Kupandol Area", "Ward 2 - Jhamsikhel Area", "Ward 2 - Kalopul Area", "Ward 2 - Sanepa Area", "Ward 3 - Pulchowk Area", "Ward 4 - Jawalakhel Area", "Ward 5 - Kumaripati Area", "Ward 5 - Patan Hospital Area", "Ward 6 - Kanibahal Area", "Ward 7 - Sundhara Area", "Ward 8 - Guitole Area", "Ward 9 - Balkumari Area", "Ward 9 - Chayasal Area", "Ward 10 - Chakupat Area", "Ward 11 - Banglamukhi Area", "Ward 12 - Thaina Area", "Ward 14 - Kusunti Area", "Ward 15 - Lagankhel Area", "Ward 15 - Satdobato Area", "Ward 16 - Mangalbazar Area", "Ward 17 - Gwarko Area", "Ward 19 - Macchindrabahal Area", "Ward 20 - Patandhoka Area"],
      "Lalitpur Outside Ring Road": ["Godawari - Bajrabarahi Area", "Godawari - Botanical Garden Area", "Godawari - Chapagaun Buspark Area", "Godawari - Jharuwarasi", "Godawari - Thaiba", "Godawari - Thecho", "Karyabinayak - Chhampi", "Karyabinayak - Chunikhel", "Karyabinayak - Dhaichhap", "Karyabinayak - Khokana", "Karyabinayak - Tikabhairabh", "Lalitpur - Bhaisepati Area", "Lalitpur - Bungamati Area", "Lalitpur - Chokhel Area", "Lalitpur - Dhapakhel Area", "Lalitpur - Dholahiti", "Lalitpur - Harisiddhi Patan Area", "Lalitpur - Imadole Area", "Lalitpur - Khumaltar Area", "Lalitpur - Loha Chowk", "Lalitpur - Nakhipot Area", "Lalitpur - Nakhipot Kantipur Colony", "Lalitpur - Nakhu Area", "Lalitpur - Ranibu Area", "Lalitpur - Sanepa Indrayani Mandir", "Lalitpur - Sunakoti Area", "Mahalaxmi - Changathali", "Mahalaxmi - Lamatar Bus Stop Area", "Mahalaxmi - Lubhu", "Mahalaxmi - Tikathali"],
      "Nilkantha - Dhading": ["Maale Bagar", "Nilkantha School Area", "Pahare Chautara"],
      "Panauti": ["Khopasi Hydropower Reservoir Area", "Panauti Municipality Office Area", "Panauti Museum Area", "Wolachhen Bagaicha Area"],
      "Panchkhal": ["Dhulikhel Zipline Area", "Dulalthok", "Keraghari", "Lamidanda", "Panchkhal Municipality Area", "Shree Ram Pati"],
      "Rapti": ["Dhungrebaas", "Dhura Bazaar", "Fm Marga", "Laxman Chowk", "Milan Chowk", "Siddha Baba Chowk"],
      "Ratnanagar": ["Sauraha Chowk", "Tadi Bazar"],
      "Sindhuli-Kamalamai": ["Sindhuli Bus Park Area", "Sindhuli Haat Bazaar", "Tamaghat Chowk", "Zero Kilo"]
    },
    "Gandaki Province": {
      "Baglung Bazaar": ["Jeep Park", "Lali Gurans Chowk", "Tiger Chowk", "Traffic Chowk", "Upallachaur", "Yatyat Karyalaya Area"],
      "Beni": ["Birendra Chowk", "Campus Chowk", "Hospital Chowk", "Kali Pool Buspark", "New Road Area"],
      "Bhimad": ["Bhimad Bazaar", "Male Bagar Bazaar", "Purano Bazaar"],
      "Damauli": ["Aadikavi Bhanubhakta Campus Area", "Bhadgau", "Chapaghat", "Damauli Bazar", "Damauli Bus Station Area", "Damauli College", "Dihi Gaun", "District Hospital Area", "Immanuel Church Area", "Patan", "Vorletar Chowk"],
      "Devchuli": ["Daldale", "Dharapani Bazaar", "Pragatinagar", "Rajahar Bazaar", "Sashwat Dham Area"],
      "Gaindakot": ["Congress Chowk", "Gaindakot Municipality Office Area", "Ganesh Mandir Area", "Harihar Mandir", "Harkapur Area", "Kali Gandaki Bus Stop Area", "Kalika Mandir Area", "Thumsi Area"],
      "Gorkha Bazaar": ["District Hospital Chowk", "Haramtari Chowk", "Patechaur", "Petrol Pump Area", "Purano Buspark"],
      "Kawasoti": ["Bishnunagar", "Danda", "Gyanodaya Chowk", "Panchaknya Chowk", "Thakali Chowk", "Thana Chowk"],
      "Kushma": ["Bhandari Tole", "Bunjee Side", "Jilla Prahari Karyala Chowk", "Khareha", "Sasatra Camp", "Shivalaya Chowk"],
      "Lekhnath": ["Arghau Chowk", "Budibazar Chowk", "Sishuwa Chowk", "Talchowk"],
      "Pokhara": ["Amarsingh Chowk Area", "Bagar Area", "Baglung Buspark Area", "Baidam Area", "Traffic Chowk", "Birauta Area", "Birauta Chowk Area", "Nayapul", "Saulibazzar", "Surya Nepal Factory Area"],
      "Putalibazar": ["Badkhola Chowk", "Shahid Chowk"],
      "Shuklagandaki": ["Belchautara", "Dhor Phedi Area", "Dulegaunda Bazaar", "Khairenitar Bazar", "Suidibar Bus Park Area"],
      "Sundarbazar": ["Khatrithati", "Lamjung Campus Area", "Milan Chowk", "Shiva Oil Area"],
      "Waling": ["Bhakunde Chowk", "Bhakunde Covered Hall Area", "Buddha Tole", "Waling Bus Park Area", "Waling Multiple Campus Area", "WCCI Chowk"]
    },
    "Karnali Province": {
      "Bheriganga": ["Bahunichaur", "Chhinchu", "Jahare Bazaar", "Ramghat"],
      "Birendranagar - Surkhet": ["Army Camp Area", "Dhuliyabit Area", "Kakrebihar Area", "Mangalgadhi Chowk Area", "Radio Nepal Area", "Surkhet Hospital Area", "Uttarganga Area"],
      "Lekbeshi": ["Dashrathpur", "Salli Bazar"]
    },
    "Koshi Province": {
      "Arjundhara": ["Arjundhara Municipality Office Area", "Bhaisabadi", "Laxmipur Bus Stop Area", "Post Office Area"],
      "Belbari": ["Aadarsha Boarding School Area", "Belbari Health Post Area", "Belbari Multiple Campus Area", "Belbari Paschhim Bus Park Area", "Betana Wetland", "Bhaunne Bazaar", "Dangihat Rangashala Area", "Laxmi Marga Chowk", "Malpot Line", "Sahakari Tole"],
      "Bhadrapur": ["Bhadrapur Buspark Area", "Campus Mode Area", "Dukhi Tole Area", "Giri Chowk Area", "Kirat Colony Area", "Mechi Hospital Area"],
      "Biratnagar": ["Roadcess/Koshi Project Area", "Aarti Strip Factory Area", "Bargacchi Chowk Area", "Bhirkuti Chowk Area", "Buddha Chowk Area", "Campus Road Area", "DPS School Area", "Haat Khola Area", "Hospital Chowk", "Ikrahi Area", "Jaljala Chowk Area", "Janpathtole Area", "Jhorahat Area", "Kanchanbari Area", "Katahari Area", "Keshaliya Rampur", "Kharji Kohobara", "Meghabari Area"],
      "Birtamod": ["Atithi Sadan Area", "Beldangi Chowk Area", "Bhagwan Chowk", "Birtabazar Area", "Birtamod Buspark Area", "Buttabari Area", "Charpane Area", "Dharmakata Road Area", "Garamuni Campus Area", "Hanuman Central Area", "Harkalal Marga Area", "Heaven Water Park Area", "Jatrubadi Chowk Area", "Kankai Road Area", "Mahananda Chowk", "Mechi Eye Hospital Area"],
      "Chandragadi": ["Bhaire Chowk", "Chaitu Mandir Area", "Chandragadi Airport Area", "Devkota Chowk Area", "Dhanushmod Area", "Jagriti Nagar", "Kendramode Area", "Lekhnath Chowk Area", "Mahendra Park Area", "Makalu Tole Area", "New Amda Hospital Area", "Sangam Chowk Area", "Shanti Chowk Area", "Shanti Marga Area"],
      "Damak": ["Beldangi Area", "Buddha Chowk Area", "Damak Buspark Area", "Damak Multiple Campus Area", "Falgunanda Chowk Area", "Gumaune Area", "Havildar Chowk Area", "Krishna Mandir Area"],
      "Dhankuta": ["Adalat Road", "Dadagaun Football Ground", "Dhankuta Bus Park Area", "Dhankuta Multiple Campus Area", "Dhankuta Stadium", "Heli Pad Area", "Hile", "Mangalbarey Area", "Phushre Area", "Purano Bazaar", "Putali Line", "Shyam Chowk Area", "Tinkune Area", "Zero Point Area"],
      "Dharan": ["Bagarkot Area", "Bargachhi Area", "Bhanu Chowk Area", "Bhotepul Area", "Bijayapur Area", "BP Health Science Institute Area", "Chata Chowk Area", "Dharan Railway Area", "Dharan Stadium Area"],
      "Duhabi": ["Ball Statue", "Duhabi Bus Park Area", "Sonapur Bus Park Area"],
      "Gauradaha": ["Beldangi Chowk", "Campus Mode", "Dhobiniya Chowk", "Dipu Chowk", "Gauradaha Bazaar", "Gauriganj Bazar", "Mechi Eye Hospital Area", "Milan Chowk", "Mahendra Ratna Multiple Campus Area", "Tilkeni Mod"],
      "Ilam": ["Bhrikuti Chowk", "Fikkal", "Ilam Bazar Area", "Ilam Bus Park Area", "Ilam Municipality Area", "Ilam View Tower Area", "Kalinaag Mandir Area", "Kharel Dada", "Labipur Area", "Pakali Area", "Pandhare Tole Area", "Suvidha Nagar", "Swagat Tole Area", "Tarahara Area", "Tax Office Area", "Traffic Chowk Area"],
      "Inaruwa": ["Bihibare Hat Bazar", "Inaruwa Bus Stop Area", "Inaruwa Hospital Area", "Jhumka", "Sakhuwagachhi", "Simpane Pragati Tole"],
      "Itahari": ["Army Headquarters Area", "Balgram Area", "Bhetghat Chowk", "Gaisar Area", "Halgada Chowk Area", "Hatiya Line Area", "Itahari Buspark Area", "Jhumka City Area", "Khanar City Area", "Tulasibari Playground Area"],
      "Kakarbhitta": ["Barmeli Tole Area", "Eye Hospital Area", "Kakarbhitta Buspark Area", "Kakarbhitta Customs Area", "Post Office Area", "Pragati Tole Area", "Surunga Chowk"],
      "Kankai": ["Champapur Playground Area", "Durgapur", "Kalisthan Chowk", "Kankai Multiple Campus Area", "Kankai Municipality Office Area", "Koti Hom Bus Park Area", "Ratna Park Area", "Sangam Tole", "Subedi Chowk"],
      "Letang Bhogateni": ["Budhabare", "Letang Bazaar"],
      "Pathari-Shanischare": ["Bhutanese Refugee Camp Area", "Bokre Chowk", "Buddha Chowk", "Haatkhola Bazaar", "Hasandaha Bus Stop Area", "Pathari Bazaar"],
      "Rangeli": ["Aitabare Chowk", "Drabesha", "Janata Multiple Campus Area", "Rangeli Bazaar", "Rangeli Hospital Area", "Sombare Bazar", "Tribhuwan Chowk"],
      "Ratuwamai": ["Aamtola Bazaar", "Damravitta Bazaar", "Itahara Chowk", "Sijuwa Chowk"],
      "Shivasatakshi": ["Aambari Chowk", "Dohamana Pashu Bazar"],
      "Sunawarshi": ["Amardaha", "Dainiya", "Dohamana Pashu Bazar"],
      "Sundar Haraincha": ["Amardaha", "Dainiya"],
      "Triyuga": ["Baliya Chowk", "Birat Chowk Area", "Dulari Chowk", "Goth Gaun City Area", "Khorsane", "Khorsane Chowk", "Lalvitti", "Triyuga Janata Multiple Campus Area", "Udayapur FM Area", "Yalambar Tole"],
      "Urlabari": ["Chuhade Chowk", "Jaljale Bazaar", "Main Chowk", "Madhumalla Area", "Mangalbare Area", "Puma Chowk"]
    },
    "Lumbini Province": {
      "Banganga": ["4 Number Chowk", "Bangain", "Bodegaun Chowk", "Chappar Gau", "Dhaneshpur", "Gajehada Bus Stop Area", "Jhanda", "Khane Pani Office Area", "Koili Bangai", "Manoharpur", "Motipur - Banganga", "Pipara Bazaar", "Supa Deurali Mandir - Banganga"],
      "Bardaghat": ["Bardaghat Bus Stop Area", "Basa Basahi Chowk", "Chisapani Hospital Area", "Mohini Cinema Hall Area", "Panchanagar", "Upahar Nagar Park Area"],
      "Butwal": ["Belbas", "Buddhanagar - Naharpur", "Buspark Area", "Butwal Campus Area", "Butwal Industrial Area", "Chauraha", "Deep Nagar", "Devinagar", "Fulbari", "Golpark", "Haatbazar Area", "Kalika Nagar", "Laxminagar", "Maina Bagar Area", "Majuwa", "Milan Chowk", "Motipur Area", "Nayagaun", "Nepalgunj Road Area", "Ramnagar", "Semlar Area", "Sukhha Nagar", "Tamnagar", "Traffic Chowk Area", "Yogi Kuti Area"],
      "Dang - Ghorahi": ["Bharatpur Area", "Chaughera Area", "Ghorahi Buspark Area", "Nayabazar Area", "Newroad Area", "Ratanpur Area", "Sahidgate Area", "Traffic Chowk Area", "Tulsipur Chowk Area"],
      "Dang - Tulsipur": ["Bahini Chowk Area", "BP Chowk Area", "Ganeshpur Area", "Parseni Area", "Tarigaun Area", "Tulsipur Buspark Area"],
      "Devdaha": ["Bhaluhi", "Charange", "Ghodaha", "Khaireni", "Sitalnagar"],
      "Kohalpur": ["Babanagar", "Chappargaudi", "Happy Water Park Area", "Kaushila Nagar", "Kohalpur Chowk", "Kohalpur Police Beat No 1 Area", "Madan Chowk", "Manakamana Chowk", "Nepalgunj College Area", "Nepalgunj Medical College Area", "Siddha Nagar"],
      "Lamahi": ["Bangaun", "Bankatta", "Deukhuri Campus Area", "Gurjihawa", "Lamahi Bus Park Area", "Lamahi Municipality Office Area", "Namai", "Narti", "Shantinagar"],
      "Lumbini Sanskriti": ["Lumbini Bikas Kosh Area", "Madhubani", "Mahajidiya", "Padariya", "Tenuhawa"],
      "Nepalgunj": ["Adarsh Nagar Area", "Basudevpur Area", "Belaspur Area", "Bhawanipur Area", "BP Chowk Area", "Dhamboji Area", "Indrapur Area", "Jaisapur Area", "Khaskarkado Area", "Manikapur Area", "Nepalgunj Buspark Area", "Prasapur Area", "Puraina Area", "Udayapur Area"],
      "Ramgram": ["Bhumahi", "Buddha Chowk", "Durga Mandir", "Parasi Bus Park Area", "Ramagrama Relic Stupa Area", "Ramgram Municipality Office Area"],
      "Sainamaina": ["Basgadi Area", "Buddhanagar Area", "Murgiya", "Ramapur Area", "Ranibagiya", "Saljhandi Area"],
      "Shivaraj - Chanauta": ["Chanauta Bus Stop Area", "Halla Nagar", "Jawabhari", "Kharendrapur", "Laxmi Tole", "Samiti Chowk", "Shivapur Haat Bazaar"],
      "Sidarthanagar - Bhairahawa": ["Bhairahawa Airport Area", "Bhairahawa Buspark Area", "Brishapati College Area", "Buddha Chowk Area", "Darkachua Area", "Devkota Chowk Area", "Durga Colony", "Electricity Office Area", "Milan Chowk Area", "Ranigaun Area", "Universal College Area"],
      "Sunwal": ["Badera", "Bankatti", "Jyamire", "Kerbani", "Mahakavi Devkota Campus Area", "Sunwal Bus-Station Area", "Sunwal Church Area", "Swathi Area"],
      "Tausen": ["Bartung Bus Stop Area", "Hotel Srinagar Area", "Lumbini Medical College Area", "Mehaldhara", "Narayansthan Pond Area", "Palpa Eye Hospital Area", "Palpa Hospital Area", "Taksar Tole", "Tansen Bus Park Area", "Tansen Multiple Campus Area", "United Mission Hospital Area"],
      "Taulihawa - Kapilvastu": ["Jamohara Area", "Kapilvastu Multiple Campus", "Kapilvastu Museum", "Taulihawa Bus Station", "Taulihawa Haat Bazaar", "Tilaurakot"],
      "Tilotama": ["12 Number Area", "4 Number Area", "Banbatika", "Bhalwari", "Bihuli", "Dinganagar", "Drivertol", "Janakinagar", "Kotihawa", "Manglapur", "Manigram", "Nayamil", "OSHO", "Pathardada", "Sakhwani", "Shankhanagar", "Sitarice Mill"]
    },
    "Madhesh Province": {
      "Bardibas": ["Bardibas Bus Stop Area", "Bardibas Hospital Area", "Baridibas", "Bishwakarma Mandir Area", "Dhalkebar", "Gauridanda", "Lalgadh"],
      "Birgunj": ["Adarshnagar Area", "Birgunj Buspark Area", "Birgunj Customs Area", "Birta Area", "Brahma Chowk Area", "Chhapkaiya Area", "Chitragupt Area", "Gahawa Mai Area", "Ghadiharwa Pokhari Area", "Ghantaghar Area", "Minabazaar Area", "Murali Area", "Nagwa Pokhari", "New ICP Dryport", "Powerhouse Area", "Pratima Chowk Area", "Radhemai Area", "Ranighat Area", "Resham Kothi Area", "Shreepur Area"],
      "Chandrapur": ["Buspark Area", "Chapur Bazar", "Laxminiya", "Ramdaiya", "Sakhuwa Bazar", "Sapahi"],
      "Chhireswarnath": ["Chhireswarnath Durga Chowk", "Chhireswarnath Police Station Area"],
      "Dhanushadham": ["Bhiman Chowk", "Dhanushadham Municipality Office Area", "Dharapani Chowk", "Govindapur", "Kisanpur", "Kumhara", "Tejnagar", "Yagyabhumi"],
      "Golbazar": ["Campus Area", "Golbazar Main Chowk", "Mahajan Tole", "Maruti Cement Factory Area", "Naya Choharwa", "Purwa Bus Stop Area"],
      "Hansapur": ["Belhi Chowk", "Hanspur Municipality Office Area", "Kathapulla", "Suga Nikash"],
      "Hariwan": ["Aditya Batika Chowk", "Bagmati Karmaiya Area", "Barhathawa", "Chaturbhujeshwar Multiple Campus Area", "Chini Mill Area", "Dabri Bazar", "Dharahara Chowk", "Ganesh Chowk", "Ghurkauli Chowk", "Hariyon Bus Park Area", "Hariyon Park Area", "Jirat Bazar", "Milan Chowk", "Naya Road Chowk Area", "Purwa Bus Park Area", "Putali Chowk Area", "Shankarpur Area", "Sita Palace Hotel Area", "Solti Bazaar", "Sunrise School Area"],
      "Jaleswor": ["Jaleswor Buddhijibi Chowk", "Mahadev Mandir", "Mahendra Chowk", "Parkauli Chowk", "Pipara", "Shankar Chowk", "Zero Mile"],
      "Janakpur": ["Bahuarwa Area", "Balmiki Nagar", "Bhanu Chowk", "Brahmapura Chowk", "Janaki Mandir Area", "Janaki Nagar", "Janakpur Airport Area", "Kadam Chowk", "Kishori Nagar", "Kurtha", "Lohana Area", "Madhesh Pradesh Sabha Area", "Mahavir Chowk", "Mahuwa-Kapileswor", "Manharpur", "Mills Area", "Mujelia Area", "Murali Chowk", "Pidari Chowk", "Pulchowk", "Ramanand Chowk", "Ram Chowk", "Thapa Chowk", "Viswakarma Chowk", "Wakil Tole", "Zero Mile"],
      "Jeetpur - Simara": ["Auraha Area", "Badan Nagar Area", "Bajeni Area", "Barack Area", "Boring Tole", "Hulas Area", "Jagadamba Area", "Jeetpur Bazaar Area", "Kera Dhoka Area", "Laxmi Hall Area", "Narbasti Area", "Nepal Boards Area", "Paani Tanki Area", "Pahadi Tole", "Parwanipur", "Pathlaiya Traffic Chowk", "Rampur Tokani - Dabur Area", "Shanti Tole", "Shiv Parvati Hall Area", "Simara Airport Area", "Simara Chowk Area", "Simara Colony", "Simara Powerhouse Area", "Surya Niwas Area", "Telecom Area"],
      "Kalaiya": ["Bharat Chowk", "Buspark Area", "CDO Office Area", "Gupta Oil Area", "Hanuman Mandir Area", "Kalaiya Bajar", "Kalaiya Barewa Hospital Area", "Kalaiya Malpot Area", "Motisar", "Parsauni", "Rajaram Campus Area", "Shiksha Office Area", "Siddheshwor Mandir Area", "Vegetable Mart Area"],
      "Lahan": ["Ganesh Chowk", "Ganeshpur", "ISKCON Area", "J.S. Murarka Campus Area", "Lahan Municipality Office Area", "Lahan Post Office Area", "Lahan Vegetable Market", "Nepal Telecom Area", "Padariya", "Saptarishi Hospital Area", "Sisawani", "Netragunj", "Pattharkot", "Raniganj Chowk"],
      "Lalbandi": ["Bayalbas Bazaar", "Dhukdhuki FM Area", "Janajyoti Multiple Campus Area", "Jutpani Bus Stop Area", "Kalinjor School Area", "Khatiwoda Chowk", "Laxmipur", "Marin Jane Chowk", "Mejargunj Chautara", "Nawalpur Bazaar", "Netragunj", "Pattharkot", "Raniganj Chowk"],
      "Malangwa": ["Buspark Area", "Ghamhariya Bus Stop Area", "Jilla Bikash Samati Chowk", "Kabilashi Bus Stop Area", "Katari Chowk", "Krishna Chowk", "Malangwa Nagarpalika Chowk", "Mirchaiya Bazar", "Salempur Chowk", "Shivsagar Chowk"],
      "Mirchaiya": ["Bhagwatpur", "Fulbariya School Area", "Ghurmi Bazaar", "Katari Chowk", "Mirchaiya Bazar", "Sanstha Chowk"],
      "Mithila": ["Dhalkebar Chowk", "Dhalkebar Substation Area", "Jamunabas Bus Park Area", "Kushwaha Chowk", "Mithila Municipality Office Area", "Ram Laxman Chowk"],
      "Mithila Bihari": ["Bhutahi Bazar", "Mauwahi", "Purandaha Bazaar", "Tarapatti Bazaar", "Tarapatti Sirsiya"],
      "Nagarain": ["Fulgama", "Hospital Chowk", "Jatahi", "Lagmagadhaguthi", "Lagmagadhaguthi Masjid Area", "Thera", "Vegetable Market Area"],
      "Rajbiraj": ["Airport Area", "Boriya Petrol Pump Area", "Gajendra Narayan Singh Chowk", "Islampur Purni Pokhri", "Karn Park Area", "Maleth", "Nochha Park Area", "Pulchowk", "Rajbiraj Model Campus Area", "Raj Devi Field Area", "Shree Shiv Baba Mandir Area", "Tetri Gachhi Chowk", "Turanti Pokhari Area", "Urban Green Park Area"],
      "Sabaila": ["Bhathihan Bazaar", "Hanuman Chowk", "Sabaila Bazaar", "Sabaila Municipality Office Area", "Thilla Yaduwa"],
      "Shahidnagar": ["Adarsha Chowk", "Chandani Chowk", "Hanuman Mandir Area", "Noori Jama Masjid Area", "Shahid Municipality Office Area", "Yadukuha Police Beat Area"]
    },
    "Sudurpashchim Province": {
      "Bhajani": ["Bhajani Trishakti", "Joshipur", "Thapapur - Mahadeuli"],
      "Bhimdatta-Mahendranagar": ["Bhagatpur", "Bhasi", "Gadda Chauki", "Gobariya", "Mahendranagar Bazar", "Suda"],
      "Dhangadhi": ["Adarsha Tole Area", "Airport Area", "Badhara Area", "Bishalnagar Area", "Boradadi Area", "Campus Road Area", "Chatakpur Area", "Chauraha Area", "Ganesh Mandir Area", "Hasanpur Area", "Jai Area", "Kailali Customs Office", "Kailali District Court Area", "Khaptad Chowk", "LN Chowk", "Milan Chowk Area", "Om Shanti Tole", "Rajpur Area", "Santoshi Tole Area", "Satkar Chowk Area", "Shivpuri Dham Area", "Taranagar Area", "Tiketal Area", "Uttar Behandi"],
      "Gauriganga": ["Aambari Galli Area", "Banbehada Bazaar", "Chaumala Bazaar", "Kuchaini", "Mangalpur Bazaar"],
      "Ghodaghodi": ["Ghoda Ghodi Multiple College Area", "Pahalmanpur Bazaar", "Sukhad Bazaar"],
      "Godawari": ["Attariya Chowk", "Dixit Nagar", "Geta", "Krishna Mandir Tole", "Lalpur Football Ground Area", "Malakheti", "Shreepur", "Syaule Bazar"],
      "Lamki Chuha": ["Chisapani Bazaar", "Dododhara Chowk", "Ganeshpur Chowk", "Gulara Bus Park Area", "Lamki Bazaar", "Lamki Zero Mile", "Motipur"],
      "Tikapur": ["Bijayanagar", "Munuwa", "Narayanpur Chauraha", "Satti Bazaar", "Tikapur Airport Area", "Tikapur Campus Area", "Tikapur Poly Technical Area"]
    }
  };
  
  // Get cities for selected province
  const getCitiesForProvince = (province: string) => {
    return province ? Object.keys(locationData[province] || {}) : [];
  };
  
  // Get areas for selected city
  const getAreasForCity = (province: string, city: string) => {
    return province && city ? locationData[province]?.[city] || [] : [];
  };
  
  // Handle province selection
  const handleProvinceChange = (province: string) => {
    setSelectedProvince(province);
    setSelectedCity("");
    setSelectedArea("");
  };
  
  // Handle city selection
  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setSelectedArea("");
  };
  
  // Filter skills based on search query
  const filteredSkills = skillSearchQuery 
    ? availableSkills.filter(skill => 
        skill.toLowerCase().includes(skillSearchQuery.toLowerCase()) && 
        !selectedSkills.includes(skill)
      )
    : availableSkills.filter(skill => !selectedSkills.includes(skill));
  
  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    // If template1 is selected, pre-populate with some relevant skills
    if (templateId === "template1") {
      setSelectedSkills(["React", "JavaScript", "CSS", "HTML", "TypeScript"]);
    } else if (templateId === "template2") {
      setSelectedSkills(["UI Design", "UX Design", "Figma", "Prototyping", "Wireframing"]);
    } else if (templateId === "template3") {
      setSelectedSkills(["Node.js", "Express", "MongoDB", "REST API", "JavaScript"]);
    }
    
    toast({
      title: "Template Selected",
      description: "Job template has been loaded.",
    });
  };
  
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSubmit = () => {
    toast({
      title: "Success!",
      description: "Your job has been posted successfully.",
    });
    onSuccess();
  };
  
  const handleSaveTemplate = () => {
    toast({
      title: "Template Saved",
      description: "This job has been saved as a template for future use.",
    });
  };
  
  const handleAddSkill = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };
  
  const handleRemoveSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter(s => s !== skill));
  };
  
  const handleAddCustomSkill = () => {
    if (customSkill && !selectedSkills.includes(customSkill)) {
      setSelectedSkills([...selectedSkills, customSkill]);
      setCustomSkill("");
    }
  };
  
  const renderStepIndicator = () => {
    return (
      <div className="flex justify-between items-center mb-8">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                index + 1 === currentStep
                  ? "border-primary bg-primary text-white"
                  : index + 1 < currentStep
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-gray-300 text-gray-400"
              }`}
            >
              {index + 1 < currentStep ? (
                <Check className="h-5 w-5" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`h-1 w-16 mt-5 ${
                  index + 1 < currentStep ? "bg-primary" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    );
  };
  
  const renderTemplateSelection = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Select a template or start from scratch</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs"
            onClick={() => setCurrentStep(2)}
          >
            Skip
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card className={`cursor-pointer hover:shadow-md transition-shadow ${
            selectedTemplate === null ? "ring-2 ring-primary" : ""
          }`} onClick={() => setSelectedTemplate(null)}>
            <CardContent className="p-4 flex flex-col items-center justify-center min-h-[120px]">
              <Plus className="h-10 w-10 text-gray-400 mb-2" />
              <p className="font-medium">Start from Scratch</p>
            </CardContent>
          </Card>
          
          {templates.map(template => (
            <Card 
              key={template.id} 
              className={`cursor-pointer hover:shadow-md transition-shadow ${
                selectedTemplate === template.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => handleSelectTemplate(template.id)}
            >
              <CardContent className="p-4">
                <h4 className="font-medium">{template.title}</h4>
                <p className="text-sm text-gray-500">{template.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };
  
  const renderBasicDetails = () => {
    return (
      <div className="space-y-6">
        <div>
          <Label htmlFor="job-title">Job Title</Label>
          <Input id="job-title" placeholder="e.g. Frontend Developer" defaultValue={selectedTemplate === "template1" ? "Frontend Developer" : ""} />
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="job-type">Job Type</Label>
            <Select defaultValue="full-time">
              <SelectTrigger id="job-type">
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="freelance">Freelance</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
        <div className="space-y-4">
          <Label>Job Location</Label>
          
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="province">Province</Label>
              <Select value={selectedProvince} onValueChange={handleProvinceChange}>
                <SelectTrigger id="province">
                  <SelectValue placeholder="Select Province" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(locationData).map((province) => (
                    <SelectItem key={province} value={province}>
                      {province}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="city">City</Label>
              <Select value={selectedCity} onValueChange={handleCityChange} disabled={!selectedProvince}>
                <SelectTrigger id="city">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  {getCitiesForProvince(selectedProvince).map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="area">Area</Label>
              <Select value={selectedArea} onValueChange={setSelectedArea} disabled={!selectedCity}>
                <SelectTrigger id="area">
                  <SelectValue placeholder="Select Area" />
                </SelectTrigger>
                <SelectContent>
                  {getAreasForCity(selectedProvince, selectedCity).map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="salary-min">Minimum Salary (NPR)</Label>
            <Input id="salary-min" type="number" placeholder="e.g. 50000" />
          </div>
          
          <div>
            <Label htmlFor="salary-max">Maximum Salary (NPR)</Label>
            <Input id="salary-max" type="number" placeholder="e.g. 80000" />
          </div>
        </div>
      </div>
    );
  };
  
  const renderDetailsAndRequirements = () => {
    return (
      <div className="space-y-6">
        <div>
          <Label htmlFor="job-description">Job Description</Label>
          <Textarea 
            id="job-description" 
            placeholder="Describe the role and responsibilities" 
            rows={5} 
            defaultValue={selectedTemplate === "template1" ? "We are looking for an experienced Frontend Developer with strong React skills to join our team." : ""}
          />
        </div>
        
        <div>
          <Label htmlFor="job-requirements">Requirements</Label>
          <Textarea 
            id="job-requirements" 
            placeholder="List the skills and qualifications required" 
            rows={5}
            defaultValue={selectedTemplate === "template1" ? "- 3+ years of experience with React\n- Proficiency in JavaScript, HTML and CSS\n- Experience with responsive design" : ""}
          />
        </div>
        
        <div>
          <Label className="mb-2 block">Skills Required</Label>
          
          {/* Selected skills display */}
          <div className="flex flex-wrap gap-2 mb-4 min-h-12 p-3 border rounded-md bg-gray-50">
            {selectedSkills.length > 0 ? (
              selectedSkills.map((skill) => (
                <Badge 
                  key={skill} 
                  className="bg-primary text-white flex items-center gap-1 pl-3 pr-2 py-1.5"
                >
                  {skill}
                  <button 
                    className="ml-1 rounded-full hover:bg-primary-600 p-0.5"
                    onClick={() => handleRemoveSkill(skill)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))
            ) : (
              <span className="text-gray-500 text-sm">No skills selected yet. Please select skills below.</span>
            )}
          </div>
          
          {/* Search and add custom skill */}
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search for skills" 
                className="pl-8"
                value={skillSearchQuery}
                onChange={(e) => setSkillSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Input 
                placeholder="Add custom skill" 
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                className="max-w-[200px]"
              />
              <Button size="sm" onClick={handleAddCustomSkill}>Add</Button>
            </div>
          </div>
          
          {/* Skills by categories - Tinder-style UI */}
          <div className="space-y-4">
            {skillCategories.map((category, idx) => (
              <div key={idx} className="bg-white border rounded-md p-3">
                <h4 className="font-medium mb-2 text-secondary-600">{category.name}</h4>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge 
                      key={skill} 
                      variant={selectedSkills.includes(skill) ? "default" : "outline"}
                      className={`cursor-pointer transition-all ${
                        selectedSkills.includes(skill) 
                          ? "bg-primary text-white" 
                          : "hover:bg-primary/10"
                      }`}
                      onClick={() => selectedSkills.includes(skill) 
                        ? handleRemoveSkill(skill) 
                        : handleAddSkill(skill)
                      }
                    >
                      {skill}
                      {selectedSkills.includes(skill) && <Check className="ml-1 h-3 w-3" />}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Popular skills or searched skills */}
          {skillSearchQuery && filteredSkills.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium mb-2 text-secondary-600">Search Results</h4>
              <div className="flex flex-wrap gap-2">
                {filteredSkills.slice(0, 15).map((skill) => (
                  <Badge 
                    key={skill} 
                    variant="outline"
                    className="cursor-pointer hover:bg-primary/10"
                    onClick={() => handleAddSkill(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  const renderApplicationSettings = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="require-video" className="block mb-1">Require Video Resume</Label>
            <p className="text-sm text-gray-500">Candidates will be asked to submit a video resume</p>
          </div>
          <Switch 
            id="require-video"
            checked={requireVideoResume}
            onCheckedChange={setRequireVideoResume}
          />
        </div>
        
        {requireVideoResume && (
          <div className="bg-gray-50 p-4 rounded-lg border flex items-start gap-3">
            <Video className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-sm">Video Resume Requirements</p>
              <p className="text-sm text-gray-600">
                Candidates will be asked to submit a 1-2 minute video answering:
              </p>
              <ul className="text-sm text-gray-600 list-disc list-inside mt-2">
                <li>Briefly introduce yourself and your background</li>
                <li>Why are you interested in this position?</li>
                <li>What makes you a good fit for this role?</li>
              </ul>
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="save-template" className="block mb-1">Save as Template</Label>
            <p className="text-sm text-gray-500">Save this job for future use</p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1"
            onClick={handleSaveTemplate}
          >
            <Save className="h-4 w-4" /> Save as Template
          </Button>
        </div>
        
        <div>
          <Label htmlFor="deadline">Application Deadline</Label>
          <Input type="date" id="deadline" />
        </div>
      </div>
    );
  };
  
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderTemplateSelection();
      case 2:
        return renderBasicDetails();
      case 3:
        return renderDetailsAndRequirements();
      case 4:
        return renderApplicationSettings();
      default:
        return null;
    }
  };
  
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Post a New Job</CardTitle>
        <CardDescription>
          Step {currentStep} of {totalSteps}: {
            currentStep === 1 ? "Choose Template" : 
            currentStep === 2 ? "Basic Details" : 
            currentStep === 3 ? "Job Description & Requirements" : 
            "Application Settings"
          }
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {renderStepIndicator()}
        {renderCurrentStep()}
      </CardContent>
      
      <CardFooter className="flex justify-between border-t pt-6">
        <Button 
          variant="outline" 
          onClick={currentStep === 1 ? onCancel : handleBack}
        >
          {currentStep === 1 ? "Cancel" : "Back"}
        </Button>
        
        <Button onClick={handleNext}>
          {currentStep === totalSteps ? "Post Job" : "Continue"}
        </Button>
      </CardFooter>
    </Card>
  );
}
