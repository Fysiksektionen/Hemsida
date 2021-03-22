import { IProfileCard } from '../components/styret/ProfileCard';
import profileImg1 from '../placeholder_images/gustav_profilecard.jpg';
import profileImg2 from '../placeholder_images/morris_profilecard.jpg';
import { IProfileCards } from '../components/styret/ProfileCardsGrid';

const gustavCard : IProfileCard = {
    description: 'Har huvudansvar för sektionens ekonomi. Bokför även en hel del.',
    email: 'kassor@f.kth.se',
    imageUrl: profileImg1,
    name: 'Gustav von Knorring',
    role: 'Kassör',
    yearCode: 'F-18'
};

const morrisCard : IProfileCard = {
    description: 'Jag leder Styrelsens arbete och är ytterst ansvarig för sektionens verksamhet och att representera den utåt. Mig kan du alltid kontakta om du har frågor!',
    email: 'ordf@f.kth.se',
    imageUrl: profileImg2,
    name: 'Morris Eriksson',
    role: 'Ordförande',
    yearCode: 'F-18'
};

export const dummyCards : IProfileCards = {
    cards: [
        gustavCard,
        morrisCard,
        gustavCard,
        morrisCard,
        gustavCard,
        morrisCard,
        gustavCard
    ]
};
