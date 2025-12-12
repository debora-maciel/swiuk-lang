"use client"

import { useTheme } from "@/app/core/context/theme/ThemeContext";
import { useLanguage } from "@/app/core/context/language/LanguageContext";
import { useParams } from "next/navigation";
import Link from "next/link";
import { IoArrowBackCircle } from "react-icons/io5";
import { MdFlight, MdWork, MdRestaurant, MdShoppingCart, MdLocalHospital, MdSchool } from "react-icons/md";
import { HiSpeakerWave } from "react-icons/hi2";
import { useState, useEffect } from "react";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";

const topicIcons: Record<string, React.ReactNode> = {
  travel: <MdFlight size={24} />,
  work: <MdWork size={24} />,
  restaurant: <MdRestaurant size={24} />,
  shopping: <MdShoppingCart size={24} />,
  health: <MdLocalHospital size={24} />,
  education: <MdSchool size={24} />,
};

interface Phrase {
  id: number;
  original: string;
  translation: {
    en: string;
    de: string;
    fr: string;
  };
}

interface Conversation {
  id: number;
  title: {
    en: string;
    de: string;
    fr: string;
  };
  lines: {
    speaker: string;
    original: string;
    translation: {
      en: string;
      de: string;
      fr: string;
    };
  }[];
}

interface Level {
  level: number;
  phrases: Phrase[];
  conversations: Conversation[];
}

const topicData: Record<string, Level[]> = {
  travel: [
    {
      level: 1,
      phrases: [
        { id: 1, original: "Où est la gare?", translation: { en: "Where is the train station?", de: "Wo ist der Bahnhof?", fr: "Où est la gare?" } },
        { id: 2, original: "Un billet, s'il vous plaît.", translation: { en: "A ticket, please.", de: "Eine Fahrkarte, bitte.", fr: "Un billet, s'il vous plaît." } },
        { id: 3, original: "Un billet pour Paris, s'il vous plaît.", translation: { en: "A ticket to Paris, please.", de: "Eine Fahrkarte nach Paris, bitte.", fr: "Un billet pour Paris, s'il vous plaît." } },
        { id: 4, original: "À quelle heure part le train?", translation: { en: "What time does the train leave?", de: "Wann fährt der Zug ab?", fr: "À quelle heure part le train?" } },
        { id: 5, original: "Je voudrais réserver un hôtel.", translation: { en: "I would like to book a hotel.", de: "Ich möchte ein Hotel buchen.", fr: "Je voudrais réserver un hôtel." } },
        { id: 6, original: "Pouvez-vous m'indiquer le chemin?", translation: { en: "Can you show me the way?", de: "Können Sie mir den Weg zeigen?", fr: "Pouvez-vous m'indiquer le chemin?" } },
        { id: 7, original: "Mon vol est retardé.", translation: { en: "My flight is delayed.", de: "Mein Flug ist verspätet.", fr: "Mon vol est retardé." } },
        { id: 8, original: "J'ai raté ma correspondance.", translation: { en: "I missed my connection.", de: "Ich habe meinen Anschluss verpasst.", fr: "J'ai raté ma correspondance." } },
        { id: 9, original: "Je voudrais modifier ma réservation.", translation: { en: "I would like to change my reservation.", de: "Ich möchte meine Reservierung ändern.", fr: "Je voudrais modifier ma réservation." } },
        { id: 10, original: "Y a-t-il un supplément pour les bagages?", translation: { en: "Is there an extra charge for luggage?", de: "Gibt es einen Aufpreis für Gepäck?", fr: "Y a-t-il un supplément pour les bagages?" } },
      ],
      conversations: [
        {
          id: 1,
          title: { en: "Asking for Directions", de: "Nach dem Weg fragen", fr: "Demander son chemin" },
          lines: [
            { speaker: "A", original: "Excusez-moi, où est la gare?", translation: { en: "Excuse me, where is the station?", de: "Entschuldigung, wo ist der Bahnhof?", fr: "Excusez-moi, où est la gare?" } },
            { speaker: "B", original: "Tout droit, puis à gauche.", translation: { en: "Straight ahead, then left.", de: "Geradeaus, dann links.", fr: "Tout droit, puis à gauche." } },
          ],
        },
        {
          id: 2,
          title: { en: "Buying a Ticket", de: "Eine Fahrkarte kaufen", fr: "Acheter un billet" },
          lines: [
            { speaker: "A", original: "Un aller-retour pour Lyon, s'il vous plaît.", translation: { en: "A round trip to Lyon, please.", de: "Eine Hin- und Rückfahrkarte nach Lyon, bitte.", fr: "Un aller-retour pour Lyon, s'il vous plaît." } },
            { speaker: "B", original: "Première ou deuxième classe?", translation: { en: "First or second class?", de: "Erste oder zweite Klasse?", fr: "Première ou deuxième classe?" } },
            { speaker: "A", original: "Deuxième classe.", translation: { en: "Second class.", de: "Zweite Klasse.", fr: "Deuxième classe." } },
          ],
        },
        {
          id: 3,
          title: { en: "At the Hotel", de: "Im Hotel", fr: "À l'hôtel" },
          lines: [
            { speaker: "A", original: "Bonjour, j'ai une réservation.", translation: { en: "Hello, I have a reservation.", de: "Hallo, ich habe eine Reservierung.", fr: "Bonjour, j'ai une réservation." } },
            { speaker: "B", original: "À quel nom?", translation: { en: "Under what name?", de: "Auf welchen Namen?", fr: "À quel nom?" } },
            { speaker: "A", original: "Martin. Pour deux nuits.", translation: { en: "Martin. For two nights.", de: "Martin. Für zwei Nächte.", fr: "Martin. Pour deux nuits." } },
          ],
        },
        {
          id: 4,
          title: { en: "At the Airport", de: "Am Flughafen", fr: "À l'aéroport" },
          lines: [
            { speaker: "A", original: "Bonjour, votre passeport s'il vous plaît.", translation: { en: "Hello, your passport please.", de: "Hallo, Ihren Reisepass bitte.", fr: "Bonjour, votre passeport s'il vous plaît." } },
            { speaker: "B", original: "Voilà. J'ai aussi ma carte d'embarquement.", translation: { en: "Here you go. I also have my boarding pass.", de: "Hier bitte. Ich habe auch meine Bordkarte.", fr: "Voilà. J'ai aussi ma carte d'embarquement." } },
            { speaker: "A", original: "Parfait. Avez-vous des bagages à enregistrer?", translation: { en: "Perfect. Do you have any luggage to check in?", de: "Perfekt. Haben Sie Gepäck aufzugeben?", fr: "Parfait. Avez-vous des bagages à enregistrer?" } },
            { speaker: "B", original: "Oui, une valise.", translation: { en: "Yes, one suitcase.", de: "Ja, einen Koffer.", fr: "Oui, une valise." } },
          ],
        },
        {
          id: 5,
          title: { en: "Travel Problems", de: "Reiseprobleme", fr: "Problèmes de voyage" },
          lines: [
            { speaker: "A", original: "Mon vol a été annulé. Que puis-je faire?", translation: { en: "My flight was cancelled. What can I do?", de: "Mein Flug wurde storniert. Was kann ich tun?", fr: "Mon vol a été annulé. Que puis-je faire?" } },
            { speaker: "B", original: "Je peux vous proposer un vol demain matin.", translation: { en: "I can offer you a flight tomorrow morning.", de: "Ich kann Ihnen einen Flug morgen früh anbieten.", fr: "Je peux vous proposer un vol demain matin." } },
            { speaker: "A", original: "Et pour l'hébergement ce soir?", translation: { en: "And for accommodation tonight?", de: "Und für die Unterkunft heute Abend?", fr: "Et pour l'hébergement ce soir?" } },
            { speaker: "B", original: "La compagnie prend en charge un hôtel.", translation: { en: "The airline will cover a hotel.", de: "Die Fluggesellschaft übernimmt ein Hotel.", fr: "La compagnie prend en charge un hôtel." } },
          ],
        },
      ],
    },
    { level: 2, phrases: [], conversations: [] },
    { level: 3, phrases: [], conversations: [] },
    { level: 4, phrases: [], conversations: [] },
    { level: 5, phrases: [], conversations: [] },
  ],
  work: [
    {
      level: 1,
      phrases: [
        { id: 1, original: "Bonjour, je suis nouveau.", translation: { en: "Hello, I'm new here.", de: "Hallo, ich bin neu hier.", fr: "Bonjour, je suis nouveau." } },
        { id: 2, original: "Où est mon bureau?", translation: { en: "Where is my desk?", de: "Wo ist mein Schreibtisch?", fr: "Où est mon bureau?" } },
        { id: 3, original: "Je travaille dans le marketing.", translation: { en: "I work in marketing.", de: "Ich arbeite im Marketing.", fr: "Je travaille dans le marketing." } },
        { id: 4, original: "Avez-vous une réunion aujourd'hui?", translation: { en: "Do you have a meeting today?", de: "Haben Sie heute ein Meeting?", fr: "Avez-vous une réunion aujourd'hui?" } },
        { id: 5, original: "Je dois envoyer ce rapport.", translation: { en: "I need to send this report.", de: "Ich muss diesen Bericht senden.", fr: "Je dois envoyer ce rapport." } },
        { id: 6, original: "Pouvez-vous me transférer l'appel?", translation: { en: "Can you transfer the call to me?", de: "Können Sie mir den Anruf durchstellen?", fr: "Pouvez-vous me transférer l'appel?" } },
        { id: 7, original: "Je suis en congé demain.", translation: { en: "I'm on leave tomorrow.", de: "Ich habe morgen frei.", fr: "Je suis en congé demain." } },
        { id: 8, original: "La date limite est vendredi.", translation: { en: "The deadline is Friday.", de: "Die Frist ist Freitag.", fr: "La date limite est vendredi." } },
        { id: 9, original: "Je souhaiterais négocier mon salaire.", translation: { en: "I would like to negotiate my salary.", de: "Ich möchte mein Gehalt verhandeln.", fr: "Je souhaiterais négocier mon salaire." } },
        { id: 10, original: "Quelles sont les possibilités d'évolution?", translation: { en: "What are the growth opportunities?", de: "Welche Aufstiegsmöglichkeiten gibt es?", fr: "Quelles sont les possibilités d'évolution?" } },
      ],
      conversations: [
        {
          id: 1,
          title: { en: "Job Interview", de: "Vorstellungsgespräch", fr: "Entretien d'embauche" },
          lines: [
            { speaker: "A", original: "Parlez-moi de votre expérience.", translation: { en: "Tell me about your experience.", de: "Erzählen Sie mir von Ihrer Erfahrung.", fr: "Parlez-moi de votre expérience." } },
            { speaker: "B", original: "J'ai travaillé cinq ans dans ce domaine.", translation: { en: "I worked five years in this field.", de: "Ich habe fünf Jahre in diesem Bereich gearbeitet.", fr: "J'ai travaillé cinq ans dans ce domaine." } },
          ],
        },
        {
          id: 2,
          title: { en: "Project Meeting", de: "Projektbesprechung", fr: "Réunion de projet" },
          lines: [
            { speaker: "A", original: "Où en sommes-nous sur le projet?", translation: { en: "Where are we on the project?", de: "Wo stehen wir beim Projekt?", fr: "Où en sommes-nous sur le projet?" } },
            { speaker: "B", original: "Nous avons terminé la première phase.", translation: { en: "We have completed the first phase.", de: "Wir haben die erste Phase abgeschlossen.", fr: "Nous avons terminé la première phase." } },
          ],
        },
      ],
    },
    { level: 2, phrases: [], conversations: [] },
    { level: 3, phrases: [], conversations: [] },
    { level: 4, phrases: [], conversations: [] },
    { level: 5, phrases: [], conversations: [] },
  ],
  restaurant: [
    {
      level: 1,
      phrases: [
        { id: 1, original: "Une table pour deux, s'il vous plaît.", translation: { en: "A table for two, please.", de: "Ein Tisch für zwei, bitte.", fr: "Une table pour deux, s'il vous plaît." } },
        { id: 2, original: "Le menu, s'il vous plaît.", translation: { en: "The menu, please.", de: "Die Speisekarte, bitte.", fr: "Le menu, s'il vous plaît." } },
        { id: 3, original: "Je voudrais voir le menu.", translation: { en: "I would like to see the menu.", de: "Ich möchte die Speisekarte sehen.", fr: "Je voudrais voir le menu." } },
        { id: 4, original: "L'addition, s'il vous plaît.", translation: { en: "The bill, please.", de: "Die Rechnung, bitte.", fr: "L'addition, s'il vous plaît." } },
        { id: 5, original: "Je suis allergique aux noix.", translation: { en: "I am allergic to nuts.", de: "Ich bin allergisch gegen Nüsse.", fr: "Je suis allergique aux noix." } },
        { id: 6, original: "C'était délicieux!", translation: { en: "It was delicious!", de: "Es war köstlich!", fr: "C'était délicieux!" } },
        { id: 7, original: "Quel vin recommandez-vous?", translation: { en: "Which wine do you recommend?", de: "Welchen Wein empfehlen Sie?", fr: "Quel vin recommandez-vous?" } },
        { id: 8, original: "Je voudrais réserver pour ce soir.", translation: { en: "I would like to book for tonight.", de: "Ich möchte für heute Abend reservieren.", fr: "Je voudrais réserver pour ce soir." } },
        { id: 9, original: "Pourriez-vous adapter ce plat pour un régime végétalien?", translation: { en: "Could you adapt this dish for a vegan diet?", de: "Könnten Sie dieses Gericht für eine vegane Ernährung anpassen?", fr: "Pourriez-vous adapter ce plat pour un régime végétalien?" } },
        { id: 10, original: "Comment sont préparés les fruits de mer?", translation: { en: "How is the seafood prepared?", de: "Wie werden die Meeresfrüchte zubereitet?", fr: "Comment sont préparés les fruits de mer?" } },
      ],
      conversations: [
        {
          id: 1,
          title: { en: "Ordering Food", de: "Essen bestellen", fr: "Commander à manger" },
          lines: [
            { speaker: "A", original: "Vous avez choisi?", translation: { en: "Have you decided?", de: "Haben Sie gewählt?", fr: "Vous avez choisi?" } },
            { speaker: "B", original: "Oui, je prends le plat du jour.", translation: { en: "Yes, I'll have the dish of the day.", de: "Ja, ich nehme das Tagesgericht.", fr: "Oui, je prends le plat du jour." } },
          ],
        },
      ],
    },
    { level: 2, phrases: [], conversations: [] },
    { level: 3, phrases: [], conversations: [] },
    { level: 4, phrases: [], conversations: [] },
    { level: 5, phrases: [], conversations: [] },
  ],
  shopping: [
    {
      level: 1,
      phrases: [
        { id: 1, original: "Combien ça coûte?", translation: { en: "How much does it cost?", de: "Wie viel kostet das?", fr: "Combien ça coûte?" } },
        { id: 2, original: "C'est trop cher.", translation: { en: "It's too expensive.", de: "Das ist zu teuer.", fr: "C'est trop cher." } },
        { id: 3, original: "Je cherche une taille M.", translation: { en: "I'm looking for size M.", de: "Ich suche Größe M.", fr: "Je cherche une taille M." } },
        { id: 4, original: "Puis-je payer par carte?", translation: { en: "Can I pay by card?", de: "Kann ich mit Karte bezahlen?", fr: "Puis-je payer par carte?" } },
        { id: 5, original: "Y a-t-il des soldes?", translation: { en: "Are there any sales?", de: "Gibt es Ausverkäufe?", fr: "Y a-t-il des soldes?" } },
        { id: 6, original: "Où sont les cabines d'essayage?", translation: { en: "Where are the fitting rooms?", de: "Wo sind die Umkleidekabinen?", fr: "Où sont les cabines d'essayage?" } },
        { id: 7, original: "Puis-je échanger cet article?", translation: { en: "Can I exchange this item?", de: "Kann ich diesen Artikel umtauschen?", fr: "Puis-je échanger cet article?" } },
        { id: 8, original: "Avez-vous une garantie?", translation: { en: "Do you have a warranty?", de: "Haben Sie eine Garantie?", fr: "Avez-vous une garantie?" } },
        { id: 9, original: "Je voudrais faire une réclamation.", translation: { en: "I would like to make a complaint.", de: "Ich möchte eine Beschwerde einreichen.", fr: "Je voudrais faire une réclamation." } },
        { id: 10, original: "Quelle est votre politique de retour?", translation: { en: "What is your return policy?", de: "Was ist Ihre Rückgaberichtlinie?", fr: "Quelle est votre politique de retour?" } },
      ],
      conversations: [
        {
          id: 1,
          title: { en: "At the Store", de: "Im Geschäft", fr: "Au magasin" },
          lines: [
            { speaker: "A", original: "Je peux vous aider?", translation: { en: "Can I help you?", de: "Kann ich Ihnen helfen?", fr: "Je peux vous aider?" } },
            { speaker: "B", original: "Oui, je cherche un cadeau.", translation: { en: "Yes, I'm looking for a gift.", de: "Ja, ich suche ein Geschenk.", fr: "Oui, je cherche un cadeau." } },
          ],
        },
      ],
    },
    { level: 2, phrases: [], conversations: [] },
    { level: 3, phrases: [], conversations: [] },
    { level: 4, phrases: [], conversations: [] },
    { level: 5, phrases: [], conversations: [] },
  ],
  health: [
    {
      level: 1,
      phrases: [
        { id: 1, original: "J'ai mal.", translation: { en: "I'm in pain.", de: "Ich habe Schmerzen.", fr: "J'ai mal." } },
        { id: 2, original: "Aidez-moi!", translation: { en: "Help me!", de: "Helfen Sie mir!", fr: "Aidez-moi!" } },
        { id: 3, original: "J'ai mal à la tête.", translation: { en: "I have a headache.", de: "Ich habe Kopfschmerzen.", fr: "J'ai mal à la tête." } },
        { id: 4, original: "Où est la pharmacie?", translation: { en: "Where is the pharmacy?", de: "Wo ist die Apotheke?", fr: "Où est la pharmacie?" } },
        { id: 5, original: "J'ai besoin d'un médecin.", translation: { en: "I need a doctor.", de: "Ich brauche einen Arzt.", fr: "J'ai besoin d'un médecin." } },
        { id: 6, original: "C'est une urgence!", translation: { en: "It's an emergency!", de: "Es ist ein Notfall!", fr: "C'est une urgence!" } },
        { id: 7, original: "Je prends ce médicament.", translation: { en: "I take this medication.", de: "Ich nehme dieses Medikament.", fr: "Je prends ce médicament." } },
        { id: 8, original: "Je suis allergique à la pénicilline.", translation: { en: "I am allergic to penicillin.", de: "Ich bin allergisch gegen Penicillin.", fr: "Je suis allergique à la pénicilline." } },
        { id: 9, original: "Je voudrais un deuxième avis médical.", translation: { en: "I would like a second medical opinion.", de: "Ich möchte eine zweite ärztliche Meinung.", fr: "Je voudrais un deuxième avis médical." } },
        { id: 10, original: "Quels sont les effets secondaires possibles?", translation: { en: "What are the possible side effects?", de: "Was sind die möglichen Nebenwirkungen?", fr: "Quels sont les effets secondaires possibles?" } },
      ],
      conversations: [
        {
          id: 1,
          title: { en: "At the Doctor", de: "Beim Arzt", fr: "Chez le médecin" },
          lines: [
            { speaker: "A", original: "Qu'est-ce qui ne va pas?", translation: { en: "What's wrong?", de: "Was fehlt Ihnen?", fr: "Qu'est-ce qui ne va pas?" } },
            { speaker: "B", original: "J'ai de la fièvre depuis hier.", translation: { en: "I've had a fever since yesterday.", de: "Ich habe seit gestern Fieber.", fr: "J'ai de la fièvre depuis hier." } },
          ],
        },
      ],
    },
    { level: 2, phrases: [], conversations: [] },
    { level: 3, phrases: [], conversations: [] },
    { level: 4, phrases: [], conversations: [] },
    { level: 5, phrases: [], conversations: [] },
  ],
  education: [
    {
      level: 1,
      phrases: [
        { id: 1, original: "Je suis étudiant.", translation: { en: "I am a student.", de: "Ich bin Student.", fr: "Je suis étudiant." } },
        { id: 2, original: "Où est la bibliothèque?", translation: { en: "Where is the library?", de: "Wo ist die Bibliothek?", fr: "Où est la bibliothèque?" } },
        { id: 3, original: "Je suis étudiant en informatique.", translation: { en: "I am a computer science student.", de: "Ich bin Informatikstudent.", fr: "Je suis étudiant en informatique." } },
        { id: 4, original: "À quelle heure commence le cours?", translation: { en: "What time does the class start?", de: "Wann beginnt der Unterricht?", fr: "À quelle heure commence le cours?" } },
        { id: 5, original: "Je dois réviser pour l'examen.", translation: { en: "I need to study for the exam.", de: "Ich muss für die Prüfung lernen.", fr: "Je dois réviser pour l'examen." } },
        { id: 6, original: "Puis-je emprunter ce livre?", translation: { en: "Can I borrow this book?", de: "Kann ich dieses Buch ausleihen?", fr: "Puis-je emprunter ce livre?" } },
        { id: 7, original: "Quelle est la date limite?", translation: { en: "What is the deadline?", de: "Was ist die Frist?", fr: "Quelle est la date limite?" } },
        { id: 8, original: "Je voudrais m'inscrire à ce cours.", translation: { en: "I would like to enroll in this course.", de: "Ich möchte mich für diesen Kurs anmelden.", fr: "Je voudrais m'inscrire à ce cours." } },
        { id: 9, original: "Pourriez-vous me recommander pour ce programme?", translation: { en: "Could you recommend me for this program?", de: "Könnten Sie mich für dieses Programm empfehlen?", fr: "Pourriez-vous me recommander pour ce programme?" } },
        { id: 10, original: "Je prépare ma thèse de doctorat.", translation: { en: "I am preparing my doctoral thesis.", de: "Ich bereite meine Doktorarbeit vor.", fr: "Je prépare ma thèse de doctorat." } },
      ],
      conversations: [
        {
          id: 1,
          title: { en: "In Class", de: "Im Unterricht", fr: "En classe" },
          lines: [
            { speaker: "A", original: "Avez-vous des questions?", translation: { en: "Do you have any questions?", de: "Haben Sie Fragen?", fr: "Avez-vous des questions?" } },
            { speaker: "B", original: "Oui, pouvez-vous répéter?", translation: { en: "Yes, can you repeat that?", de: "Ja, können Sie das wiederholen?", fr: "Oui, pouvez-vous répéter?" } },
          ],
        },
      ],
    },
    { level: 2, phrases: [], conversations: [] },
    { level: 3, phrases: [], conversations: [] },
    { level: 4, phrases: [], conversations: [] },
    { level: 5, phrases: [], conversations: [] },
  ],
};

const translations = {
  en: {
    backTo: "Back to Vocabulary",
    phrases: "Phrases",
    conversations: "Conversations",
    level: "Level",
    topics: {
      travel: "Travel & Transport",
      work: "Work & Business",
      restaurant: "Food & Dining",
      shopping: "Shopping",
      health: "Health & Emergency",
      education: "Education",
    },
  },
  de: {
    backTo: "Zurück zu Vokabeln",
    phrases: "Sätze",
    conversations: "Gespräche",
    level: "Stufe",
    topics: {
      travel: "Reisen & Transport",
      work: "Arbeit & Geschäft",
      restaurant: "Essen & Restaurant",
      shopping: "Einkaufen",
      health: "Gesundheit & Notfall",
      education: "Bildung",
    },
  },
  fr: {
    backTo: "Retour au vocabulaire",
    phrases: "Phrases",
    conversations: "Conversations",
    level: "Niveau",
    topics: {
      travel: "Voyage & Transport",
      work: "Travail & Affaires",
      restaurant: "Cuisine & Restaurant",
      shopping: "Shopping",
      health: "Santé & Urgences",
      education: "Éducation",
    },
  },
};

export default function TopicPage() {
  const { colors } = useTheme();
  const { language } = useLanguage();
  const params = useParams();
  const topic = params.topic as string;
  const t = translations[language];
  const levels = topicData[topic];
  const [activeTab, setActiveTab] = useState<"phrases" | "conversations">("phrases");
  const [selectedLevel, setSelectedLevel] = useState<number>(1);

  if (!levels) {
    return (
      <div className={`min-h-screen ${colors.backgroundLight} flex items-center justify-center`}>
        <p className={colors.text}>Topic not found</p>
      </div>
    );
  }

  const currentLevel = levels.find(l => l.level === selectedLevel) || levels[0];

  // Preload voices on mount (needed for mobile)
  useEffect(() => {
    if ('speechSynthesis' in window) {
      speechSynthesis.getVoices();
      speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
    }
  }, []);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.8;

      const voices = speechSynthesis.getVoices();
      const frenchVoice = voices.find(voice => voice.lang.startsWith('fr'));
      if (frenchVoice) {
        utterance.voice = frenchVoice;
      }

      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className={`w-full min-h-screen ${colors.backgroundLight} px-4 py-6 md:p-12`}>
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <Link href="/vocabulary" className={`${colors.text70} flex items-center gap-2 mb-4 hover:${colors.text}`}>
          <IoArrowBackCircle size={24} />
          <span>{t.backTo}</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className={`${colors.textReverse} ${colors.backgroundReverse} p-3 rounded-xl`}>
            {topicIcons[topic]}
          </div>
          <h1 className={`${colors.text} font-bold text-2xl md:text-4xl`}>
            {t.topics[topic as keyof typeof t.topics]}
          </h1>
        </div>
      </div>

      {/* Level Selector */}
      <div className="mb-6 flex items-center gap-4">
        <Dropdown
          menu={{
            items: [
              {
                key: 'label',
                label: t.level,
                disabled: true,
              },
              { type: 'divider' },
              ...levels.map((level) => ({
                key: String(level.level),
                label: `${t.level} ${level.level}`,
              })),
            ],
            selectable: true,
            selectedKeys: [String(selectedLevel)],
            onClick: (info) => setSelectedLevel(Number(info.key)),
          }}
          trigger={['click']}
        >
          <div className={`${colors.text} flex gap-3 font-semibold cursor-pointer`}>
            <div className="border px-2 py-1 font-semibold rounded">
              {t.level} {selectedLevel}
            </div>
          </div>
        </Dropdown>
        <p className={`${colors.text60} text-sm`}>
          {currentLevel.phrases.length} {t.phrases.toLowerCase()}, {currentLevel.conversations.length} {t.conversations.toLowerCase()}
        </p>
      </div>

      {/* Tabs */}
      <div className={`flex gap-2 mb-6 border-b ${colors.border10} pb-4`}>
        <button
          onClick={() => setActiveTab("phrases")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === "phrases"
              ? `${colors.backgroundReverse} ${colors.textReverse}`
              : `${colors.text70} hover:${colors.text}`
          }`}
        >
          {t.phrases} ({currentLevel.phrases.length})
        </button>
        <button
          onClick={() => setActiveTab("conversations")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === "conversations"
              ? `${colors.backgroundReverse} ${colors.textReverse}`
              : `${colors.text70} hover:${colors.text}`
          }`}
        >
          {t.conversations} ({currentLevel.conversations.length})
        </button>
      </div>

      {/* Content */}
      {activeTab === "phrases" && (
        <div className="space-y-3">
          {currentLevel.phrases.length === 0 ? (
            <p className={`${colors.text60} text-center py-8`}>No phrases for this level yet</p>
          ) : (
            currentLevel.phrases.map((phrase) => (
              <div
                key={phrase.id}
                className={`${colors.background} ${colors.border10} border rounded-xl p-4 flex items-start justify-between gap-4`}
              >
                <div className="flex-1">
                  <p className={`${colors.text} text-lg font-medium mb-1`}>{phrase.original}</p>
                  <p className={`${colors.text60} text-sm`}>{phrase.translation[language === "fr" ? "en" : language]}</p>
                </div>
                <button
                  onClick={() => speakText(phrase.original)}
                  className={`${colors.text70} hover:${colors.text} p-2 rounded-lg transition-all`}
                >
                  <HiSpeakerWave size={20} />
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "conversations" && (
        <div className="space-y-6">
          {currentLevel.conversations.length === 0 ? (
            <p className={`${colors.text60} text-center py-8`}>No conversations for this level yet</p>
          ) : (
            currentLevel.conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`${colors.background} ${colors.border10} border rounded-xl overflow-hidden`}
              >
                <div className={`${colors.backgroundReverse} ${colors.textReverse} px-4 py-3 font-medium`}>
                  {conversation.title[language]}
                </div>
                <div className="p-4 space-y-4">
                  {conversation.lines.map((line, idx) => (
                    <div key={idx} className={`flex gap-3 ${line.speaker === "B" ? "flex-row-reverse" : ""}`}>
                      <div className={`${colors.border20} border ${colors.text70} w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0`}>
                        {line.speaker}
                      </div>
                      <div className={`flex-1 ${line.speaker === "B" ? "text-right" : ""}`}>
                        <div className={`${colors.border10} border rounded-lg p-3 inline-block ${line.speaker === "B" ? "text-left" : ""}`}>
                          <p className={`${colors.text} font-medium mb-1`}>{line.original}</p>
                          <p className={`${colors.text60} text-sm`}>{line.translation[language === "fr" ? "en" : language]}</p>
                        </div>
                        <button
                          onClick={() => speakText(line.original)}
                          className={`${colors.text70} hover:${colors.text} p-1 mt-1 ${line.speaker === "B" ? "mr-2" : "ml-2"}`}
                        >
                          <HiSpeakerWave size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}