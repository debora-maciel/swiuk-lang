export interface MenuItem {
  id: string;
  link: string;
}

export const menuItems: MenuItem[] = [
  {
    id: "home",
    link: "/",
  },
  {
    id: "dashboard",
    link: "/dashboard",
  },
  {
    id: "vocabulary",
    link: "/vocabulary",
  },
  {
    id: "settings",
    link: "/settings",
  },
];

export const menuTranslations = {
  en: {
    home: "Home",
    dashboard: "Dashboard",
    vocabulary: "Vocabulary",
    settings: "Settings",
  },
  de: {
    home: "Startseite",
    dashboard: "Dashboard",
    vocabulary: "Vokabeln",
    settings: "Einstellungen",
  },
  fr: {
    home: "Accueil",
    dashboard: "Tableau de bord",
    vocabulary: "Vocabulaire",
    settings: "Paramètres",
  },
  pt: {
    home: "Início",
    dashboard: "Painel",
    vocabulary: "Vocabulário",
    settings: "Configurações",
  },
};
