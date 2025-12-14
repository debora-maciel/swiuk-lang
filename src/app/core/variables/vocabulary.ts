export interface Phrase {
  id: number;
  original: string;
  translation: {
    en: string;
    de: string;
    fr: string;
    pt?: string;
  };
}

export interface Conversation {
  id: number;
  title: {
    en: string;
    de: string;
    fr: string;
    pt?: string;
  };
  lines: {
    speaker: string;
    original: string;
    translation: {
      en: string;
      de: string;
      fr: string;
      pt?: string;
    };
  }[];
}

export interface Level {
  level: number;
  phrases: Phrase[];
  conversations: Conversation[];
}

export interface Topic {
  id: string;
  levels: number;
  image?: string;
}

export const topics: Topic[] = [
  { id: "basics", levels: 5, image: "/vocabulary/words.webp" },
  { id: "numbers", levels: 5, image: "/vocabulary/numbers.webp" },
  { id: "work", levels: 5, image: "/vocabulary/business.webp" },
  { id: "restaurant", levels: 5, image: "/vocabulary/foods.webp" },
  { id: "shopping", levels: 5, image: "/vocabulary/shopping.webp" },
  { id: "health", levels: 5, image: "/vocabulary/health.webp" },
  { id: "education", levels: 5, image: "/vocabulary/education.webp" },
  { id: "travel", levels: 5, image: "/vocabulary/travel.webp" },
];

export const vocabularyTranslations = {
  en: {
    title: "Vocabulary Topics",
    subtitle: "Practice ready phrases and conversations for real-world situations",
    levels: "levels",
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
      numbers: "Numbers",
      basics: "Common Words",
    },
  },
  de: {
    title: "Vokabel-Themen",
    subtitle: "Übe fertige Sätze und Gespräche für reale Situationen",
    levels: "Stufen",
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
      numbers: "Zahlen",
      basics: "Grundwörter",
    },
  },
  fr: {
    title: "Thèmes de vocabulaire",
    subtitle: "Pratiquez des phrases et conversations pour des situations réelles",
    levels: "niveaux",
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
      numbers: "Chiffres",
      basics: "Mots Courants",
    },
  },
  pt: {
    title: "Temas de Vocabulário",
    subtitle: "Pratique frases e conversas prontas para situações do dia a dia",
    levels: "níveis",
    backTo: "Voltar ao Vocabulário",
    phrases: "Frases",
    conversations: "Conversas",
    level: "Nível",
    topics: {
      travel: "Viagem & Transporte",
      work: "Trabalho & Negócios",
      restaurant: "Comida & Restaurante",
      shopping: "Compras",
      health: "Saúde & Emergência",
      education: "Educação",
      numbers: "Números",
      basics: "Palavras Comuns",
    },
  },
};

export const topicData: Record<string, Level[]> = {
  travel: [
    {
      level: 1,
      phrases: [
        { id: 1, original: "Où est la gare?", translation: { en: "Where is the train station?", de: "Wo ist der Bahnhof?", fr: "Où est la gare?", pt: "Onde fica a estação de trem?" } },
        { id: 2, original: "Un billet, s'il vous plaît.", translation: { en: "A ticket, please.", de: "Eine Fahrkarte, bitte.", fr: "Un billet, s'il vous plaît.", pt: "Uma passagem, por favor." } },
        { id: 3, original: "Un billet pour Paris, s'il vous plaît.", translation: { en: "A ticket to Paris, please.", de: "Eine Fahrkarte nach Paris, bitte.", fr: "Un billet pour Paris, s'il vous plaît.", pt: "Uma passagem para Paris, por favor." } },
        { id: 4, original: "À quelle heure part le train?", translation: { en: "What time does the train leave?", de: "Wann fährt der Zug ab?", fr: "À quelle heure part le train?", pt: "A que horas sai o trem?" } },
        { id: 5, original: "Je voudrais réserver un hôtel.", translation: { en: "I would like to book a hotel.", de: "Ich möchte ein Hotel buchen.", fr: "Je voudrais réserver un hôtel.", pt: "Eu gostaria de reservar um hotel." } },
        { id: 6, original: "Pouvez-vous m'indiquer le chemin?", translation: { en: "Can you show me the way?", de: "Können Sie mir den Weg zeigen?", fr: "Pouvez-vous m'indiquer le chemin?", pt: "Você pode me mostrar o caminho?" } },
        { id: 7, original: "Mon vol est retardé.", translation: { en: "My flight is delayed.", de: "Mein Flug ist verspätet.", fr: "Mon vol est retardé.", pt: "Meu voo está atrasado." } },
        { id: 8, original: "J'ai raté ma correspondance.", translation: { en: "I missed my connection.", de: "Ich habe meinen Anschluss verpasst.", fr: "J'ai raté ma correspondance.", pt: "Eu perdi minha conexão." } },
        { id: 9, original: "Je voudrais modifier ma réservation.", translation: { en: "I would like to change my reservation.", de: "Ich möchte meine Reservierung ändern.", fr: "Je voudrais modifier ma réservation.", pt: "Eu gostaria de alterar minha reserva." } },
        { id: 10, original: "Y a-t-il un supplément pour les bagages?", translation: { en: "Is there an extra charge for luggage?", de: "Gibt es einen Aufpreis für Gepäck?", fr: "Y a-t-il un supplément pour les bagages?", pt: "Há uma taxa extra para bagagem?" } },
      ],
      conversations: [
        {
          id: 1,
          title: { en: "Asking for Directions", de: "Nach dem Weg fragen", fr: "Demander son chemin", pt: "Pedindo direções" },
          lines: [
            { speaker: "A", original: "Excusez-moi, où est la gare?", translation: { en: "Excuse me, where is the station?", de: "Entschuldigung, wo ist der Bahnhof?", fr: "Excusez-moi, où est la gare?", pt: "Com licença, onde fica a estação?" } },
            { speaker: "B", original: "Tout droit, puis à gauche.", translation: { en: "Straight ahead, then left.", de: "Geradeaus, dann links.", fr: "Tout droit, puis à gauche.", pt: "Em frente, depois à esquerda." } },
          ],
        },
        {
          id: 2,
          title: { en: "Buying a Ticket", de: "Eine Fahrkarte kaufen", fr: "Acheter un billet", pt: "Comprando uma passagem" },
          lines: [
            { speaker: "A", original: "Un aller-retour pour Lyon, s'il vous plaît.", translation: { en: "A round trip to Lyon, please.", de: "Eine Hin- und Rückfahrkarte nach Lyon, bitte.", fr: "Un aller-retour pour Lyon, s'il vous plaît.", pt: "Uma passagem de ida e volta para Lyon, por favor." } },
            { speaker: "B", original: "Première ou deuxième classe?", translation: { en: "First or second class?", de: "Erste oder zweite Klasse?", fr: "Première ou deuxième classe?", pt: "Primeira ou segunda classe?" } },
            { speaker: "A", original: "Deuxième classe.", translation: { en: "Second class.", de: "Zweite Klasse.", fr: "Deuxième classe.", pt: "Segunda classe." } },
          ],
        },
        {
          id: 3,
          title: { en: "At the Hotel", de: "Im Hotel", fr: "À l'hôtel", pt: "No hotel" },
          lines: [
            { speaker: "A", original: "Bonjour, j'ai une réservation.", translation: { en: "Hello, I have a reservation.", de: "Hallo, ich habe eine Reservierung.", fr: "Bonjour, j'ai une réservation.", pt: "Olá, eu tenho uma reserva." } },
            { speaker: "B", original: "À quel nom?", translation: { en: "Under what name?", de: "Auf welchen Namen?", fr: "À quel nom?", pt: "Em que nome?" } },
            { speaker: "A", original: "Martin. Pour deux nuits.", translation: { en: "Martin. For two nights.", de: "Martin. Für zwei Nächte.", fr: "Martin. Pour deux nuits.", pt: "Martin. Para duas noites." } },
          ],
        },
        {
          id: 4,
          title: { en: "At the Airport", de: "Am Flughafen", fr: "À l'aéroport", pt: "No aeroporto" },
          lines: [
            { speaker: "A", original: "Bonjour, votre passeport s'il vous plaît.", translation: { en: "Hello, your passport please.", de: "Hallo, Ihren Reisepass bitte.", fr: "Bonjour, votre passeport s'il vous plaît.", pt: "Olá, seu passaporte, por favor." } },
            { speaker: "B", original: "Voilà. J'ai aussi ma carte d'embarquement.", translation: { en: "Here you go. I also have my boarding pass.", de: "Hier bitte. Ich habe auch meine Bordkarte.", fr: "Voilà. J'ai aussi ma carte d'embarquement.", pt: "Aqui está. Também tenho meu cartão de embarque." } },
            { speaker: "A", original: "Parfait. Avez-vous des bagages à enregistrer?", translation: { en: "Perfect. Do you have any luggage to check in?", de: "Perfekt. Haben Sie Gepäck aufzugeben?", fr: "Parfait. Avez-vous des bagages à enregistrer?", pt: "Perfeito. Você tem bagagem para despachar?" } },
            { speaker: "B", original: "Oui, une valise.", translation: { en: "Yes, one suitcase.", de: "Ja, einen Koffer.", fr: "Oui, une valise.", pt: "Sim, uma mala." } },
          ],
        },
        {
          id: 5,
          title: { en: "Travel Problems", de: "Reiseprobleme", fr: "Problèmes de voyage", pt: "Problemas de viagem" },
          lines: [
            { speaker: "A", original: "Mon vol a été annulé. Que puis-je faire?", translation: { en: "My flight was cancelled. What can I do?", de: "Mein Flug wurde storniert. Was kann ich tun?", fr: "Mon vol a été annulé. Que puis-je faire?", pt: "Meu voo foi cancelado. O que posso fazer?" } },
            { speaker: "B", original: "Je peux vous proposer un vol demain matin.", translation: { en: "I can offer you a flight tomorrow morning.", de: "Ich kann Ihnen einen Flug morgen früh anbieten.", fr: "Je peux vous proposer un vol demain matin.", pt: "Posso oferecer um voo amanhã de manhã." } },
            { speaker: "A", original: "Et pour l'hébergement ce soir?", translation: { en: "And for accommodation tonight?", de: "Und für die Unterkunft heute Abend?", fr: "Et pour l'hébergement ce soir?", pt: "E para hospedagem esta noite?" } },
            { speaker: "B", original: "La compagnie prend en charge un hôtel.", translation: { en: "The airline will cover a hotel.", de: "Die Fluggesellschaft übernimmt ein Hotel.", fr: "La compagnie prend en charge un hôtel.", pt: "A companhia aérea cobrirá um hotel." } },
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
        { id: 1, original: "Bonjour, je suis nouveau.", translation: { en: "Hello, I'm new here.", de: "Hallo, ich bin neu hier.", fr: "Bonjour, je suis nouveau.", pt: "Olá, sou novo aqui." } },
        { id: 2, original: "Où est mon bureau?", translation: { en: "Where is my desk?", de: "Wo ist mein Schreibtisch?", fr: "Où est mon bureau?", pt: "Onde fica minha mesa?" } },
        { id: 3, original: "Je travaille dans le marketing.", translation: { en: "I work in marketing.", de: "Ich arbeite im Marketing.", fr: "Je travaille dans le marketing.", pt: "Eu trabalho em marketing." } },
        { id: 4, original: "Avez-vous une réunion aujourd'hui?", translation: { en: "Do you have a meeting today?", de: "Haben Sie heute ein Meeting?", fr: "Avez-vous une réunion aujourd'hui?", pt: "Você tem uma reunião hoje?" } },
        { id: 5, original: "Je dois envoyer ce rapport.", translation: { en: "I need to send this report.", de: "Ich muss diesen Bericht senden.", fr: "Je dois envoyer ce rapport.", pt: "Preciso enviar este relatório." } },
        { id: 6, original: "Pouvez-vous me transférer l'appel?", translation: { en: "Can you transfer the call to me?", de: "Können Sie mir den Anruf durchstellen?", fr: "Pouvez-vous me transférer l'appel?", pt: "Você pode me transferir a ligação?" } },
        { id: 7, original: "Je suis en congé demain.", translation: { en: "I'm on leave tomorrow.", de: "Ich habe morgen frei.", fr: "Je suis en congé demain.", pt: "Estou de folga amanhã." } },
        { id: 8, original: "La date limite est vendredi.", translation: { en: "The deadline is Friday.", de: "Die Frist ist Freitag.", fr: "La date limite est vendredi.", pt: "O prazo é sexta-feira." } },
        { id: 9, original: "Je souhaiterais négocier mon salaire.", translation: { en: "I would like to negotiate my salary.", de: "Ich möchte mein Gehalt verhandeln.", fr: "Je souhaiterais négocier mon salaire.", pt: "Eu gostaria de negociar meu salário." } },
        { id: 10, original: "Quelles sont les possibilités d'évolution?", translation: { en: "What are the growth opportunities?", de: "Welche Aufstiegsmöglichkeiten gibt es?", fr: "Quelles sont les possibilités d'évolution?", pt: "Quais são as oportunidades de crescimento?" } },
      ],
      conversations: [
        {
          id: 1,
          title: { en: "Job Interview", de: "Vorstellungsgespräch", fr: "Entretien d'embauche", pt: "Entrevista de emprego" },
          lines: [
            { speaker: "A", original: "Parlez-moi de votre expérience.", translation: { en: "Tell me about your experience.", de: "Erzählen Sie mir von Ihrer Erfahrung.", fr: "Parlez-moi de votre expérience.", pt: "Fale-me sobre sua experiência." } },
            { speaker: "B", original: "J'ai travaillé cinq ans dans ce domaine.", translation: { en: "I worked five years in this field.", de: "Ich habe fünf Jahre in diesem Bereich gearbeitet.", fr: "J'ai travaillé cinq ans dans ce domaine.", pt: "Trabalhei cinco anos nesta área." } },
          ],
        },
        {
          id: 2,
          title: { en: "Project Meeting", de: "Projektbesprechung", fr: "Réunion de projet", pt: "Reunião de projeto" },
          lines: [
            { speaker: "A", original: "Où en sommes-nous sur le projet?", translation: { en: "Where are we on the project?", de: "Wo stehen wir beim Projekt?", fr: "Où en sommes-nous sur le projet?", pt: "Como estamos no projeto?" } },
            { speaker: "B", original: "Nous avons terminé la première phase.", translation: { en: "We have completed the first phase.", de: "Wir haben die erste Phase abgeschlossen.", fr: "Nous avons terminé la première phase.", pt: "Concluímos a primeira fase." } },
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
        { id: 1, original: "Une table pour deux, s'il vous plaît.", translation: { en: "A table for two, please.", de: "Ein Tisch für zwei, bitte.", fr: "Une table pour deux, s'il vous plaît.", pt: "Uma mesa para dois, por favor." } },
        { id: 2, original: "Le menu, s'il vous plaît.", translation: { en: "The menu, please.", de: "Die Speisekarte, bitte.", fr: "Le menu, s'il vous plaît.", pt: "O cardápio, por favor." } },
        { id: 3, original: "Je voudrais voir le menu.", translation: { en: "I would like to see the menu.", de: "Ich möchte die Speisekarte sehen.", fr: "Je voudrais voir le menu.", pt: "Eu gostaria de ver o cardápio." } },
        { id: 4, original: "L'addition, s'il vous plaît.", translation: { en: "The bill, please.", de: "Die Rechnung, bitte.", fr: "L'addition, s'il vous plaît.", pt: "A conta, por favor." } },
        { id: 5, original: "Je suis allergique aux noix.", translation: { en: "I am allergic to nuts.", de: "Ich bin allergisch gegen Nüsse.", fr: "Je suis allergique aux noix.", pt: "Sou alérgico a nozes." } },
        { id: 6, original: "C'était délicieux!", translation: { en: "It was delicious!", de: "Es war köstlich!", fr: "C'était délicieux!", pt: "Estava delicioso!" } },
        { id: 7, original: "Quel vin recommandez-vous?", translation: { en: "Which wine do you recommend?", de: "Welchen Wein empfehlen Sie?", fr: "Quel vin recommandez-vous?", pt: "Qual vinho você recomenda?" } },
        { id: 8, original: "Je voudrais réserver pour ce soir.", translation: { en: "I would like to book for tonight.", de: "Ich möchte für heute Abend reservieren.", fr: "Je voudrais réserver pour ce soir.", pt: "Eu gostaria de reservar para esta noite." } },
        { id: 9, original: "Pourriez-vous adapter ce plat pour un régime végétalien?", translation: { en: "Could you adapt this dish for a vegan diet?", de: "Könnten Sie dieses Gericht für eine vegane Ernährung anpassen?", fr: "Pourriez-vous adapter ce plat pour un régime végétalien?", pt: "Você poderia adaptar este prato para uma dieta vegana?" } },
        { id: 10, original: "Comment sont préparés les fruits de mer?", translation: { en: "How is the seafood prepared?", de: "Wie werden die Meeresfrüchte zubereitet?", fr: "Comment sont préparés les fruits de mer?", pt: "Como são preparados os frutos do mar?" } },
      ],
      conversations: [
        {
          id: 1,
          title: { en: "Ordering Food", de: "Essen bestellen", fr: "Commander à manger", pt: "Pedindo comida" },
          lines: [
            { speaker: "A", original: "Vous avez choisi?", translation: { en: "Have you decided?", de: "Haben Sie gewählt?", fr: "Vous avez choisi?", pt: "Já decidiu?" } },
            { speaker: "B", original: "Oui, je prends le plat du jour.", translation: { en: "Yes, I'll have the dish of the day.", de: "Ja, ich nehme das Tagesgericht.", fr: "Oui, je prends le plat du jour.", pt: "Sim, vou querer o prato do dia." } },
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
        { id: 1, original: "Combien ça coûte?", translation: { en: "How much does it cost?", de: "Wie viel kostet das?", fr: "Combien ça coûte?", pt: "Quanto custa?" } },
        { id: 2, original: "C'est trop cher.", translation: { en: "It's too expensive.", de: "Das ist zu teuer.", fr: "C'est trop cher.", pt: "É muito caro." } },
        { id: 3, original: "Je cherche une taille M.", translation: { en: "I'm looking for size M.", de: "Ich suche Größe M.", fr: "Je cherche une taille M.", pt: "Estou procurando tamanho M." } },
        { id: 4, original: "Puis-je payer par carte?", translation: { en: "Can I pay by card?", de: "Kann ich mit Karte bezahlen?", fr: "Puis-je payer par carte?", pt: "Posso pagar com cartão?" } },
        { id: 5, original: "Y a-t-il des soldes?", translation: { en: "Are there any sales?", de: "Gibt es Ausverkäufe?", fr: "Y a-t-il des soldes?", pt: "Há promoções?" } },
        { id: 6, original: "Où sont les cabines d'essayage?", translation: { en: "Where are the fitting rooms?", de: "Wo sind die Umkleidekabinen?", fr: "Où sont les cabines d'essayage?", pt: "Onde ficam os provadores?" } },
        { id: 7, original: "Puis-je échanger cet article?", translation: { en: "Can I exchange this item?", de: "Kann ich diesen Artikel umtauschen?", fr: "Puis-je échanger cet article?", pt: "Posso trocar este artigo?" } },
        { id: 8, original: "Avez-vous une garantie?", translation: { en: "Do you have a warranty?", de: "Haben Sie eine Garantie?", fr: "Avez-vous une garantie?", pt: "Vocês têm garantia?" } },
        { id: 9, original: "Je voudrais faire une réclamation.", translation: { en: "I would like to make a complaint.", de: "Ich möchte eine Beschwerde einreichen.", fr: "Je voudrais faire une réclamation.", pt: "Eu gostaria de fazer uma reclamação." } },
        { id: 10, original: "Quelle est votre politique de retour?", translation: { en: "What is your return policy?", de: "Was ist Ihre Rückgaberichtlinie?", fr: "Quelle est votre politique de retour?", pt: "Qual é a política de devolução?" } },
      ],
      conversations: [
        {
          id: 1,
          title: { en: "At the Store", de: "Im Geschäft", fr: "Au magasin", pt: "Na loja" },
          lines: [
            { speaker: "A", original: "Je peux vous aider?", translation: { en: "Can I help you?", de: "Kann ich Ihnen helfen?", fr: "Je peux vous aider?", pt: "Posso ajudá-lo?" } },
            { speaker: "B", original: "Oui, je cherche un cadeau.", translation: { en: "Yes, I'm looking for a gift.", de: "Ja, ich suche ein Geschenk.", fr: "Oui, je cherche un cadeau.", pt: "Sim, estou procurando um presente." } },
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
        { id: 1, original: "J'ai mal.", translation: { en: "I'm in pain.", de: "Ich habe Schmerzen.", fr: "J'ai mal.", pt: "Estou com dor." } },
        { id: 2, original: "Aidez-moi!", translation: { en: "Help me!", de: "Helfen Sie mir!", fr: "Aidez-moi!", pt: "Me ajude!" } },
        { id: 3, original: "J'ai mal à la tête.", translation: { en: "I have a headache.", de: "Ich habe Kopfschmerzen.", fr: "J'ai mal à la tête.", pt: "Estou com dor de cabeça." } },
        { id: 4, original: "Où est la pharmacie?", translation: { en: "Where is the pharmacy?", de: "Wo ist die Apotheke?", fr: "Où est la pharmacie?", pt: "Onde fica a farmácia?" } },
        { id: 5, original: "J'ai besoin d'un médecin.", translation: { en: "I need a doctor.", de: "Ich brauche einen Arzt.", fr: "J'ai besoin d'un médecin.", pt: "Preciso de um médico." } },
        { id: 6, original: "C'est une urgence!", translation: { en: "It's an emergency!", de: "Es ist ein Notfall!", fr: "C'est une urgence!", pt: "É uma emergência!" } },
        { id: 7, original: "Je prends ce médicament.", translation: { en: "I take this medication.", de: "Ich nehme dieses Medikament.", fr: "Je prends ce médicament.", pt: "Eu tomo este medicamento." } },
        { id: 8, original: "Je suis allergique à la pénicilline.", translation: { en: "I am allergic to penicillin.", de: "Ich bin allergisch gegen Penicillin.", fr: "Je suis allergique à la pénicilline.", pt: "Sou alérgico à penicilina." } },
        { id: 9, original: "Je voudrais un deuxième avis médical.", translation: { en: "I would like a second medical opinion.", de: "Ich möchte eine zweite ärztliche Meinung.", fr: "Je voudrais un deuxième avis médical.", pt: "Eu gostaria de uma segunda opinião médica." } },
        { id: 10, original: "Quels sont les effets secondaires possibles?", translation: { en: "What are the possible side effects?", de: "Was sind die möglichen Nebenwirkungen?", fr: "Quels sont les effets secondaires possibles?", pt: "Quais são os possíveis efeitos colaterais?" } },
      ],
      conversations: [
        {
          id: 1,
          title: { en: "At the Doctor", de: "Beim Arzt", fr: "Chez le médecin", pt: "No médico" },
          lines: [
            { speaker: "A", original: "Qu'est-ce qui ne va pas?", translation: { en: "What's wrong?", de: "Was fehlt Ihnen?", fr: "Qu'est-ce qui ne va pas?", pt: "O que está errado?" } },
            { speaker: "B", original: "J'ai de la fièvre depuis hier.", translation: { en: "I've had a fever since yesterday.", de: "Ich habe seit gestern Fieber.", fr: "J'ai de la fièvre depuis hier.", pt: "Estou com febre desde ontem." } },
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
        { id: 1, original: "Je suis étudiant.", translation: { en: "I am a student.", de: "Ich bin Student.", fr: "Je suis étudiant.", pt: "Sou estudante." } },
        { id: 2, original: "Où est la bibliothèque?", translation: { en: "Where is the library?", de: "Wo ist die Bibliothek?", fr: "Où est la bibliothèque?", pt: "Onde fica a biblioteca?" } },
        { id: 3, original: "Je suis étudiant en informatique.", translation: { en: "I am a computer science student.", de: "Ich bin Informatikstudent.", fr: "Je suis étudiant en informatique.", pt: "Sou estudante de ciência da computação." } },
        { id: 4, original: "À quelle heure commence le cours?", translation: { en: "What time does the class start?", de: "Wann beginnt der Unterricht?", fr: "À quelle heure commence le cours?", pt: "A que horas começa a aula?" } },
        { id: 5, original: "Je dois réviser pour l'examen.", translation: { en: "I need to study for the exam.", de: "Ich muss für die Prüfung lernen.", fr: "Je dois réviser pour l'examen.", pt: "Preciso estudar para a prova." } },
        { id: 6, original: "Puis-je emprunter ce livre?", translation: { en: "Can I borrow this book?", de: "Kann ich dieses Buch ausleihen?", fr: "Puis-je emprunter ce livre?", pt: "Posso emprestar este livro?" } },
        { id: 7, original: "Quelle est la date limite?", translation: { en: "What is the deadline?", de: "Was ist die Frist?", fr: "Quelle est la date limite?", pt: "Qual é o prazo?" } },
        { id: 8, original: "Je voudrais m'inscrire à ce cours.", translation: { en: "I would like to enroll in this course.", de: "Ich möchte mich für diesen Kurs anmelden.", fr: "Je voudrais m'inscrire à ce cours.", pt: "Eu gostaria de me inscrever neste curso." } },
        { id: 9, original: "Pourriez-vous me recommander pour ce programme?", translation: { en: "Could you recommend me for this program?", de: "Könnten Sie mich für dieses Programm empfehlen?", fr: "Pourriez-vous me recommander pour ce programme?", pt: "Você poderia me recomendar para este programa?" } },
        { id: 10, original: "Je prépare ma thèse de doctorat.", translation: { en: "I am preparing my doctoral thesis.", de: "Ich bereite meine Doktorarbeit vor.", fr: "Je prépare ma thèse de doctorat.", pt: "Estou preparando minha tese de doutorado." } },
      ],
      conversations: [
        {
          id: 1,
          title: { en: "In Class", de: "Im Unterricht", fr: "En classe", pt: "Na aula" },
          lines: [
            { speaker: "A", original: "Avez-vous des questions?", translation: { en: "Do you have any questions?", de: "Haben Sie Fragen?", fr: "Avez-vous des questions?", pt: "Vocês têm perguntas?" } },
            { speaker: "B", original: "Oui, pouvez-vous répéter?", translation: { en: "Yes, can you repeat that?", de: "Ja, können Sie das wiederholen?", fr: "Oui, pouvez-vous répéter?", pt: "Sim, pode repetir?" } },
          ],
        },
      ],
    },
    { level: 2, phrases: [], conversations: [] },
    { level: 3, phrases: [], conversations: [] },
    { level: 4, phrases: [], conversations: [] },
    { level: 5, phrases: [], conversations: [] },
  ],
  basics: [
    {
      level: 1,
      phrases: [
        { id: 1, original: "qui", translation: { en: "who", de: "wer", fr: "qui", pt: "quem" } },
        { id: 2, original: "quoi / que", translation: { en: "what", de: "was", fr: "quoi / que", pt: "o que" } },
        { id: 3, original: "quand", translation: { en: "when", de: "wann", fr: "quand", pt: "quando" } },
        { id: 4, original: "où", translation: { en: "where", de: "wo", fr: "où", pt: "onde" } },
        { id: 5, original: "lequel / laquelle", translation: { en: "which", de: "welcher / welche", fr: "lequel / laquelle", pt: "qual" } },
        { id: 6, original: "à qui", translation: { en: "whose", de: "wessen", fr: "à qui", pt: "de quem" } },
        { id: 7, original: "pourquoi", translation: { en: "why", de: "warum", fr: "pourquoi", pt: "por que" } },
        { id: 8, original: "comment", translation: { en: "how", de: "wie", fr: "comment", pt: "como" } },
        { id: 9, original: "combien", translation: { en: "how much / how many", de: "wie viel / wie viele", fr: "combien", pt: "quanto / quantos" } },
        { id: 10, original: "oui", translation: { en: "yes", de: "ja", fr: "oui", pt: "sim" } },
        { id: 11, original: "non", translation: { en: "no", de: "nein", fr: "non", pt: "não" } },
        { id: 12, original: "et", translation: { en: "and", de: "und", fr: "et", pt: "e" } },
        { id: 13, original: "ou", translation: { en: "or", de: "oder", fr: "ou", pt: "ou" } },
        { id: 14, original: "mais", translation: { en: "but", de: "aber", fr: "mais", pt: "mas" } },
        { id: 15, original: "si", translation: { en: "if", de: "wenn / falls", fr: "si", pt: "se" } },
        { id: 16, original: "parce que", translation: { en: "because", de: "weil", fr: "parce que", pt: "porque" } },
        { id: 17, original: "donc", translation: { en: "so / therefore", de: "also / deshalb", fr: "donc", pt: "então / portanto" } },
        { id: 18, original: "aussi", translation: { en: "also / too", de: "auch", fr: "aussi", pt: "também" } },
        { id: 19, original: "très", translation: { en: "very", de: "sehr", fr: "très", pt: "muito" } },
        { id: 20, original: "maintenant", translation: { en: "now", de: "jetzt", fr: "maintenant", pt: "agora" } },
      ],
      conversations: [],
    },
    {
      level: 2,
      phrases: [
        { id: 1, original: "je", translation: { en: "I", de: "ich", fr: "je", pt: "eu" } },
        { id: 2, original: "tu / vous", translation: { en: "you", de: "du / Sie", fr: "tu / vous", pt: "tu / você" } },
        { id: 3, original: "il / elle", translation: { en: "he / she", de: "er / sie", fr: "il / elle", pt: "ele / ela" } },
        { id: 4, original: "nous", translation: { en: "we", de: "wir", fr: "nous", pt: "nós" } },
        { id: 5, original: "ils / elles", translation: { en: "they", de: "sie", fr: "ils / elles", pt: "eles / elas" } },
        { id: 6, original: "ce / cet / cette", translation: { en: "this", de: "dieser / diese / dieses", fr: "ce / cet / cette", pt: "este / esta" } },
        { id: 7, original: "cela / ça", translation: { en: "that", de: "das / jenes", fr: "cela / ça", pt: "isso / aquilo" } },
        { id: 8, original: "ici", translation: { en: "here", de: "hier", fr: "ici", pt: "aqui" } },
        { id: 9, original: "là", translation: { en: "there", de: "dort", fr: "là", pt: "ali / lá" } },
        { id: 10, original: "tout / tous", translation: { en: "all / every", de: "alle / jeder", fr: "tout / tous", pt: "tudo / todos" } },
        { id: 11, original: "quelque", translation: { en: "some", de: "einige", fr: "quelque", pt: "algum / alguns" } },
        { id: 12, original: "aucun", translation: { en: "none / no", de: "kein / keine", fr: "aucun", pt: "nenhum" } },
        { id: 13, original: "autre", translation: { en: "other", de: "andere", fr: "autre", pt: "outro" } },
        { id: 14, original: "même", translation: { en: "same", de: "gleich / selbe", fr: "même", pt: "mesmo" } },
        { id: 15, original: "chaque", translation: { en: "each", de: "jeder / jede", fr: "chaque", pt: "cada" } },
        { id: 16, original: "beaucoup", translation: { en: "many / much", de: "viel / viele", fr: "beaucoup", pt: "muito / muitos" } },
        { id: 17, original: "peu", translation: { en: "few / little", de: "wenig", fr: "peu", pt: "pouco" } },
        { id: 18, original: "plus", translation: { en: "more", de: "mehr", fr: "plus", pt: "mais" } },
        { id: 19, original: "moins", translation: { en: "less", de: "weniger", fr: "moins", pt: "menos" } },
        { id: 20, original: "assez", translation: { en: "enough", de: "genug", fr: "assez", pt: "bastante" } },
      ],
      conversations: [],
    },
    {
      level: 3,
      phrases: [
        { id: 1, original: "être", translation: { en: "to be", de: "sein", fr: "être", pt: "ser / estar" } },
        { id: 2, original: "avoir", translation: { en: "to have", de: "haben", fr: "avoir", pt: "ter" } },
        { id: 3, original: "faire", translation: { en: "to do / to make", de: "machen / tun", fr: "faire", pt: "fazer" } },
        { id: 4, original: "aller", translation: { en: "to go", de: "gehen", fr: "aller", pt: "ir" } },
        { id: 5, original: "venir", translation: { en: "to come", de: "kommen", fr: "venir", pt: "vir" } },
        { id: 6, original: "voir", translation: { en: "to see", de: "sehen", fr: "voir", pt: "ver" } },
        { id: 7, original: "savoir", translation: { en: "to know", de: "wissen", fr: "savoir", pt: "saber" } },
        { id: 8, original: "pouvoir", translation: { en: "can / to be able", de: "können", fr: "pouvoir", pt: "poder" } },
        { id: 9, original: "vouloir", translation: { en: "to want", de: "wollen", fr: "vouloir", pt: "querer" } },
        { id: 10, original: "devoir", translation: { en: "must / to have to", de: "müssen / sollen", fr: "devoir", pt: "dever" } },
        { id: 11, original: "dire", translation: { en: "to say / to tell", de: "sagen", fr: "dire", pt: "dizer" } },
        { id: 12, original: "parler", translation: { en: "to speak", de: "sprechen", fr: "parler", pt: "falar" } },
        { id: 13, original: "prendre", translation: { en: "to take", de: "nehmen", fr: "prendre", pt: "pegar / tomar" } },
        { id: 14, original: "donner", translation: { en: "to give", de: "geben", fr: "donner", pt: "dar" } },
        { id: 15, original: "trouver", translation: { en: "to find", de: "finden", fr: "trouver", pt: "encontrar" } },
        { id: 16, original: "penser", translation: { en: "to think", de: "denken", fr: "penser", pt: "pensar" } },
        { id: 17, original: "mettre", translation: { en: "to put", de: "setzen / stellen / legen", fr: "mettre", pt: "colocar / pôr" } },
        { id: 18, original: "croire", translation: { en: "to believe", de: "glauben", fr: "croire", pt: "acreditar" } },
        { id: 19, original: "aimer", translation: { en: "to love / to like", de: "lieben / mögen", fr: "aimer", pt: "amar / gostar" } },
        { id: 20, original: "demander", translation: { en: "to ask", de: "fragen / bitten", fr: "demander", pt: "perguntar / pedir" } },
      ],
      conversations: [],
    },
    {
      level: 4,
      phrases: [
        { id: 1, original: "aujourd'hui", translation: { en: "today", de: "heute", fr: "aujourd'hui", pt: "hoje" } },
        { id: 2, original: "hier", translation: { en: "yesterday", de: "gestern", fr: "hier", pt: "ontem" } },
        { id: 3, original: "demain", translation: { en: "tomorrow", de: "morgen", fr: "demain", pt: "amanhã" } },
        { id: 4, original: "toujours", translation: { en: "always", de: "immer", fr: "toujours", pt: "sempre" } },
        { id: 5, original: "jamais", translation: { en: "never", de: "nie / niemals", fr: "jamais", pt: "nunca" } },
        { id: 6, original: "souvent", translation: { en: "often", de: "oft", fr: "souvent", pt: "frequentemente" } },
        { id: 7, original: "parfois", translation: { en: "sometimes", de: "manchmal", fr: "parfois", pt: "às vezes" } },
        { id: 8, original: "déjà", translation: { en: "already", de: "schon / bereits", fr: "déjà", pt: "já" } },
        { id: 9, original: "encore", translation: { en: "still / again", de: "noch / wieder", fr: "encore", pt: "ainda / de novo" } },
        { id: 10, original: "bientôt", translation: { en: "soon", de: "bald", fr: "bientôt", pt: "em breve" } },
        { id: 11, original: "tôt", translation: { en: "early", de: "früh", fr: "tôt", pt: "cedo" } },
        { id: 12, original: "tard", translation: { en: "late", de: "spät", fr: "tard", pt: "tarde" } },
        { id: 13, original: "avant", translation: { en: "before", de: "vor / bevor", fr: "avant", pt: "antes" } },
        { id: 14, original: "après", translation: { en: "after", de: "nach / nachdem", fr: "après", pt: "depois" } },
        { id: 15, original: "pendant", translation: { en: "during", de: "während", fr: "pendant", pt: "durante" } },
        { id: 16, original: "depuis", translation: { en: "since / for", de: "seit", fr: "depuis", pt: "desde" } },
        { id: 17, original: "jusqu'à", translation: { en: "until", de: "bis", fr: "jusqu'à", pt: "até" } },
        { id: 18, original: "longtemps", translation: { en: "a long time", de: "lange", fr: "longtemps", pt: "muito tempo" } },
        { id: 19, original: "vite", translation: { en: "quickly", de: "schnell", fr: "vite", pt: "rápido" } },
        { id: 20, original: "lentement", translation: { en: "slowly", de: "langsam", fr: "lentement", pt: "devagar" } },
      ],
      conversations: [],
    },
    {
      level: 5,
      phrases: [
        { id: 1, original: "grand", translation: { en: "big / tall", de: "groß", fr: "grand", pt: "grande / alto" } },
        { id: 2, original: "petit", translation: { en: "small / short", de: "klein", fr: "petit", pt: "pequeno / baixo" } },
        { id: 3, original: "bon", translation: { en: "good", de: "gut", fr: "bon", pt: "bom" } },
        { id: 4, original: "mauvais", translation: { en: "bad", de: "schlecht", fr: "mauvais", pt: "mau / ruim" } },
        { id: 5, original: "nouveau", translation: { en: "new", de: "neu", fr: "nouveau", pt: "novo" } },
        { id: 6, original: "vieux", translation: { en: "old", de: "alt", fr: "vieux", pt: "velho" } },
        { id: 7, original: "jeune", translation: { en: "young", de: "jung", fr: "jeune", pt: "jovem" } },
        { id: 8, original: "beau", translation: { en: "beautiful", de: "schön", fr: "beau", pt: "bonito / lindo" } },
        { id: 9, original: "facile", translation: { en: "easy", de: "einfach / leicht", fr: "facile", pt: "fácil" } },
        { id: 10, original: "difficile", translation: { en: "difficult", de: "schwierig", fr: "difficile", pt: "difícil" } },
        { id: 11, original: "chaud", translation: { en: "hot / warm", de: "heiß / warm", fr: "chaud", pt: "quente" } },
        { id: 12, original: "froid", translation: { en: "cold", de: "kalt", fr: "froid", pt: "frio" } },
        { id: 13, original: "heureux", translation: { en: "happy", de: "glücklich", fr: "heureux", pt: "feliz" } },
        { id: 14, original: "triste", translation: { en: "sad", de: "traurig", fr: "triste", pt: "triste" } },
        { id: 15, original: "important", translation: { en: "important", de: "wichtig", fr: "important", pt: "importante" } },
        { id: 16, original: "possible", translation: { en: "possible", de: "möglich", fr: "possible", pt: "possível" } },
        { id: 17, original: "vrai", translation: { en: "true", de: "wahr", fr: "vrai", pt: "verdadeiro" } },
        { id: 18, original: "faux", translation: { en: "false", de: "falsch", fr: "faux", pt: "falso" } },
        { id: 19, original: "seul", translation: { en: "alone / only", de: "allein / einzig", fr: "seul", pt: "sozinho / único" } },
        { id: 20, original: "ensemble", translation: { en: "together", de: "zusammen", fr: "ensemble", pt: "juntos" } },
      ],
      conversations: [],
    },
  ],
  numbers: [
    {
      level: 1,
      phrases: [
        { id: 1, original: "zéro", translation: { en: "zero", de: "null", fr: "zéro", pt: "zero" } },
        { id: 2, original: "un", translation: { en: "one", de: "eins", fr: "un", pt: "um" } },
        { id: 3, original: "deux", translation: { en: "two", de: "zwei", fr: "deux", pt: "dois" } },
        { id: 4, original: "trois", translation: { en: "three", de: "drei", fr: "trois", pt: "três" } },
        { id: 5, original: "quatre", translation: { en: "four", de: "vier", fr: "quatre", pt: "quatro" } },
        { id: 6, original: "cinq", translation: { en: "five", de: "fünf", fr: "cinq", pt: "cinco" } },
        { id: 7, original: "six", translation: { en: "six", de: "sechs", fr: "six", pt: "seis" } },
        { id: 8, original: "sept", translation: { en: "seven", de: "sieben", fr: "sept", pt: "sete" } },
        { id: 9, original: "huit", translation: { en: "eight", de: "acht", fr: "huit", pt: "oito" } },
        { id: 10, original: "neuf", translation: { en: "nine", de: "neun", fr: "neuf", pt: "nove" } },
        { id: 11, original: "dix", translation: { en: "ten", de: "zehn", fr: "dix", pt: "dez" } },
        { id: 12, original: "onze", translation: { en: "eleven", de: "elf", fr: "onze", pt: "onze" } },
        { id: 13, original: "douze", translation: { en: "twelve", de: "zwölf", fr: "douze", pt: "doze" } },
        { id: 14, original: "treize", translation: { en: "thirteen", de: "dreizehn", fr: "treize", pt: "treze" } },
        { id: 15, original: "quatorze", translation: { en: "fourteen", de: "vierzehn", fr: "quatorze", pt: "catorze" } },
        { id: 16, original: "quinze", translation: { en: "fifteen", de: "fünfzehn", fr: "quinze", pt: "quinze" } },
        { id: 17, original: "seize", translation: { en: "sixteen", de: "sechzehn", fr: "seize", pt: "dezesseis" } },
        { id: 18, original: "dix-sept", translation: { en: "seventeen", de: "siebzehn", fr: "dix-sept", pt: "dezessete" } },
        { id: 19, original: "dix-huit", translation: { en: "eighteen", de: "achtzehn", fr: "dix-huit", pt: "dezoito" } },
        { id: 20, original: "dix-neuf", translation: { en: "nineteen", de: "neunzehn", fr: "dix-neuf", pt: "dezenove" } },
        { id: 21, original: "vingt", translation: { en: "twenty", de: "zwanzig", fr: "vingt", pt: "vinte" } },
      ],
      conversations: [],
    },
    {
      level: 2,
      phrases: [
        { id: 1, original: "vingt et un", translation: { en: "twenty-one", de: "einundzwanzig", fr: "vingt et un", pt: "vinte e um" } },
        { id: 2, original: "vingt-deux", translation: { en: "twenty-two", de: "zweiundzwanzig", fr: "vingt-deux", pt: "vinte e dois" } },
        { id: 3, original: "vingt-trois", translation: { en: "twenty-three", de: "dreiundzwanzig", fr: "vingt-trois", pt: "vinte e três" } },
        { id: 4, original: "vingt-quatre", translation: { en: "twenty-four", de: "vierundzwanzig", fr: "vingt-quatre", pt: "vinte e quatro" } },
        { id: 5, original: "vingt-cinq", translation: { en: "twenty-five", de: "fünfundzwanzig", fr: "vingt-cinq", pt: "vinte e cinco" } },
        { id: 6, original: "vingt-six", translation: { en: "twenty-six", de: "sechsundzwanzig", fr: "vingt-six", pt: "vinte e seis" } },
        { id: 7, original: "vingt-sept", translation: { en: "twenty-seven", de: "siebenundzwanzig", fr: "vingt-sept", pt: "vinte e sete" } },
        { id: 8, original: "vingt-huit", translation: { en: "twenty-eight", de: "achtundzwanzig", fr: "vingt-huit", pt: "vinte e oito" } },
        { id: 9, original: "vingt-neuf", translation: { en: "twenty-nine", de: "neunundzwanzig", fr: "vingt-neuf", pt: "vinte e nove" } },
        { id: 10, original: "trente", translation: { en: "thirty", de: "dreißig", fr: "trente", pt: "trinta" } },
        { id: 11, original: "trente et un", translation: { en: "thirty-one", de: "einunddreißig", fr: "trente et un", pt: "trinta e um" } },
        { id: 12, original: "trente-deux", translation: { en: "thirty-two", de: "zweiunddreißig", fr: "trente-deux", pt: "trinta e dois" } },
        { id: 13, original: "trente-trois", translation: { en: "thirty-three", de: "dreiunddreißig", fr: "trente-trois", pt: "trinta e três" } },
        { id: 14, original: "trente-quatre", translation: { en: "thirty-four", de: "vierunddreißig", fr: "trente-quatre", pt: "trinta e quatro" } },
        { id: 15, original: "trente-cinq", translation: { en: "thirty-five", de: "fünfunddreißig", fr: "trente-cinq", pt: "trinta e cinco" } },
        { id: 16, original: "trente-six", translation: { en: "thirty-six", de: "sechsunddreißig", fr: "trente-six", pt: "trinta e seis" } },
        { id: 17, original: "trente-sept", translation: { en: "thirty-seven", de: "siebenunddreißig", fr: "trente-sept", pt: "trinta e sete" } },
        { id: 18, original: "trente-huit", translation: { en: "thirty-eight", de: "achtunddreißig", fr: "trente-huit", pt: "trinta e oito" } },
        { id: 19, original: "trente-neuf", translation: { en: "thirty-nine", de: "neununddreißig", fr: "trente-neuf", pt: "trinta e nove" } },
        { id: 20, original: "quarante", translation: { en: "forty", de: "vierzig", fr: "quarante", pt: "quarenta" } },
      ],
      conversations: [],
    },
    {
      level: 3,
      phrases: [
        { id: 1, original: "quarante et un", translation: { en: "forty-one", de: "einundvierzig", fr: "quarante et un", pt: "quarenta e um" } },
        { id: 2, original: "quarante-deux", translation: { en: "forty-two", de: "zweiundvierzig", fr: "quarante-deux", pt: "quarenta e dois" } },
        { id: 3, original: "quarante-trois", translation: { en: "forty-three", de: "dreiundvierzig", fr: "quarante-trois", pt: "quarenta e três" } },
        { id: 4, original: "quarante-quatre", translation: { en: "forty-four", de: "vierundvierzig", fr: "quarante-quatre", pt: "quarenta e quatro" } },
        { id: 5, original: "quarante-cinq", translation: { en: "forty-five", de: "fünfundvierzig", fr: "quarante-cinq", pt: "quarenta e cinco" } },
        { id: 6, original: "quarante-six", translation: { en: "forty-six", de: "sechsundvierzig", fr: "quarante-six", pt: "quarenta e seis" } },
        { id: 7, original: "quarante-sept", translation: { en: "forty-seven", de: "siebenundvierzig", fr: "quarante-sept", pt: "quarenta e sete" } },
        { id: 8, original: "quarante-huit", translation: { en: "forty-eight", de: "achtundvierzig", fr: "quarante-huit", pt: "quarenta e oito" } },
        { id: 9, original: "quarante-neuf", translation: { en: "forty-nine", de: "neunundvierzig", fr: "quarante-neuf", pt: "quarenta e nove" } },
        { id: 10, original: "cinquante", translation: { en: "fifty", de: "fünfzig", fr: "cinquante", pt: "cinquenta" } },
        { id: 11, original: "cinquante et un", translation: { en: "fifty-one", de: "einundfünfzig", fr: "cinquante et un", pt: "cinquenta e um" } },
        { id: 12, original: "cinquante-deux", translation: { en: "fifty-two", de: "zweiundfünfzig", fr: "cinquante-deux", pt: "cinquenta e dois" } },
        { id: 13, original: "cinquante-trois", translation: { en: "fifty-three", de: "dreiundfünfzig", fr: "cinquante-trois", pt: "cinquenta e três" } },
        { id: 14, original: "cinquante-quatre", translation: { en: "fifty-four", de: "vierundfünfzig", fr: "cinquante-quatre", pt: "cinquenta e quatro" } },
        { id: 15, original: "cinquante-cinq", translation: { en: "fifty-five", de: "fünfundfünfzig", fr: "cinquante-cinq", pt: "cinquenta e cinco" } },
        { id: 16, original: "cinquante-six", translation: { en: "fifty-six", de: "sechsundfünfzig", fr: "cinquante-six", pt: "cinquenta e seis" } },
        { id: 17, original: "cinquante-sept", translation: { en: "fifty-seven", de: "siebenundfünfzig", fr: "cinquante-sept", pt: "cinquenta e sete" } },
        { id: 18, original: "cinquante-huit", translation: { en: "fifty-eight", de: "achtundfünfzig", fr: "cinquante-huit", pt: "cinquenta e oito" } },
        { id: 19, original: "cinquante-neuf", translation: { en: "fifty-nine", de: "neunundfünfzig", fr: "cinquante-neuf", pt: "cinquenta e nove" } },
        { id: 20, original: "soixante", translation: { en: "sixty", de: "sechzig", fr: "soixante", pt: "sessenta" } },
      ],
      conversations: [],
    },
    {
      level: 4,
      phrases: [
        { id: 1, original: "soixante et un", translation: { en: "sixty-one", de: "einundsechzig", fr: "soixante et un", pt: "sessenta e um" } },
        { id: 2, original: "soixante-deux", translation: { en: "sixty-two", de: "zweiundsechzig", fr: "soixante-deux", pt: "sessenta e dois" } },
        { id: 3, original: "soixante-trois", translation: { en: "sixty-three", de: "dreiundsechzig", fr: "soixante-trois", pt: "sessenta e três" } },
        { id: 4, original: "soixante-quatre", translation: { en: "sixty-four", de: "vierundsechzig", fr: "soixante-quatre", pt: "sessenta e quatro" } },
        { id: 5, original: "soixante-cinq", translation: { en: "sixty-five", de: "fünfundsechzig", fr: "soixante-cinq", pt: "sessenta e cinco" } },
        { id: 6, original: "soixante-six", translation: { en: "sixty-six", de: "sechsundsechzig", fr: "soixante-six", pt: "sessenta e seis" } },
        { id: 7, original: "soixante-sept", translation: { en: "sixty-seven", de: "siebenundsechzig", fr: "soixante-sept", pt: "sessenta e sete" } },
        { id: 8, original: "soixante-huit", translation: { en: "sixty-eight", de: "achtundsechzig", fr: "soixante-huit", pt: "sessenta e oito" } },
        { id: 9, original: "soixante-neuf", translation: { en: "sixty-nine", de: "neunundsechzig", fr: "soixante-neuf", pt: "sessenta e nove" } },
        { id: 10, original: "soixante-dix", translation: { en: "seventy", de: "siebzig", fr: "soixante-dix", pt: "setenta" } },
        { id: 11, original: "soixante et onze", translation: { en: "seventy-one", de: "einundsiebzig", fr: "soixante et onze", pt: "setenta e um" } },
        { id: 12, original: "soixante-douze", translation: { en: "seventy-two", de: "zweiundsiebzig", fr: "soixante-douze", pt: "setenta e dois" } },
        { id: 13, original: "soixante-treize", translation: { en: "seventy-three", de: "dreiundsiebzig", fr: "soixante-treize", pt: "setenta e três" } },
        { id: 14, original: "soixante-quatorze", translation: { en: "seventy-four", de: "vierundsiebzig", fr: "soixante-quatorze", pt: "setenta e quatro" } },
        { id: 15, original: "soixante-quinze", translation: { en: "seventy-five", de: "fünfundsiebzig", fr: "soixante-quinze", pt: "setenta e cinco" } },
        { id: 16, original: "soixante-seize", translation: { en: "seventy-six", de: "sechsundsiebzig", fr: "soixante-seize", pt: "setenta e seis" } },
        { id: 17, original: "soixante-dix-sept", translation: { en: "seventy-seven", de: "siebenundsiebzig", fr: "soixante-dix-sept", pt: "setenta e sete" } },
        { id: 18, original: "soixante-dix-huit", translation: { en: "seventy-eight", de: "achtundsiebzig", fr: "soixante-dix-huit", pt: "setenta e oito" } },
        { id: 19, original: "soixante-dix-neuf", translation: { en: "seventy-nine", de: "neunundsiebzig", fr: "soixante-dix-neuf", pt: "setenta e nove" } },
        { id: 20, original: "quatre-vingts", translation: { en: "eighty", de: "achtzig", fr: "quatre-vingts", pt: "oitenta" } },
      ],
      conversations: [],
    },
    {
      level: 5,
      phrases: [
        { id: 1, original: "quatre-vingt-un", translation: { en: "eighty-one", de: "einundachtzig", fr: "quatre-vingt-un", pt: "oitenta e um" } },
        { id: 2, original: "quatre-vingt-deux", translation: { en: "eighty-two", de: "zweiundachtzig", fr: "quatre-vingt-deux", pt: "oitenta e dois" } },
        { id: 3, original: "quatre-vingt-trois", translation: { en: "eighty-three", de: "dreiundachtzig", fr: "quatre-vingt-trois", pt: "oitenta e três" } },
        { id: 4, original: "quatre-vingt-quatre", translation: { en: "eighty-four", de: "vierundachtzig", fr: "quatre-vingt-quatre", pt: "oitenta e quatro" } },
        { id: 5, original: "quatre-vingt-cinq", translation: { en: "eighty-five", de: "fünfundachtzig", fr: "quatre-vingt-cinq", pt: "oitenta e cinco" } },
        { id: 6, original: "quatre-vingt-six", translation: { en: "eighty-six", de: "sechsundachtzig", fr: "quatre-vingt-six", pt: "oitenta e seis" } },
        { id: 7, original: "quatre-vingt-sept", translation: { en: "eighty-seven", de: "siebenundachtzig", fr: "quatre-vingt-sept", pt: "oitenta e sete" } },
        { id: 8, original: "quatre-vingt-huit", translation: { en: "eighty-eight", de: "achtundachtzig", fr: "quatre-vingt-huit", pt: "oitenta e oito" } },
        { id: 9, original: "quatre-vingt-neuf", translation: { en: "eighty-nine", de: "neunundachtzig", fr: "quatre-vingt-neuf", pt: "oitenta e nove" } },
        { id: 10, original: "quatre-vingt-dix", translation: { en: "ninety", de: "neunzig", fr: "quatre-vingt-dix", pt: "noventa" } },
        { id: 11, original: "quatre-vingt-onze", translation: { en: "ninety-one", de: "einundneunzig", fr: "quatre-vingt-onze", pt: "noventa e um" } },
        { id: 12, original: "quatre-vingt-douze", translation: { en: "ninety-two", de: "zweiundneunzig", fr: "quatre-vingt-douze", pt: "noventa e dois" } },
        { id: 13, original: "quatre-vingt-treize", translation: { en: "ninety-three", de: "dreiundneunzig", fr: "quatre-vingt-treize", pt: "noventa e três" } },
        { id: 14, original: "quatre-vingt-quatorze", translation: { en: "ninety-four", de: "vierundneunzig", fr: "quatre-vingt-quatorze", pt: "noventa e quatro" } },
        { id: 15, original: "quatre-vingt-quinze", translation: { en: "ninety-five", de: "fünfundneunzig", fr: "quatre-vingt-quinze", pt: "noventa e cinco" } },
        { id: 16, original: "quatre-vingt-seize", translation: { en: "ninety-six", de: "sechsundneunzig", fr: "quatre-vingt-seize", pt: "noventa e seis" } },
        { id: 17, original: "quatre-vingt-dix-sept", translation: { en: "ninety-seven", de: "siebenundneunzig", fr: "quatre-vingt-dix-sept", pt: "noventa e sete" } },
        { id: 18, original: "quatre-vingt-dix-huit", translation: { en: "ninety-eight", de: "achtundneunzig", fr: "quatre-vingt-dix-huit", pt: "noventa e oito" } },
        { id: 19, original: "quatre-vingt-dix-neuf", translation: { en: "ninety-nine", de: "neunundneunzig", fr: "quatre-vingt-dix-neuf", pt: "noventa e nove" } },
        { id: 20, original: "cent", translation: { en: "one hundred", de: "hundert", fr: "cent", pt: "cem" } },
      ],
      conversations: [],
    },
  ],
};

export const speedLabels = {
  en: { 'very-slow': 'Very Slow', 'slow': 'Slow', 'normal': 'Normal' },
  de: { 'very-slow': 'Sehr Langsam', 'slow': 'Langsam', 'normal': 'Normal' },
  fr: { 'very-slow': 'Très Lent', 'slow': 'Lent', 'normal': 'Normal' },
  pt: { 'very-slow': 'Muito Lento', 'slow': 'Lento', 'normal': 'Normal' },
};
