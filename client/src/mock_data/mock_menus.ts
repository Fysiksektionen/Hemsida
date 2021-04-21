import { Menu } from '../types/api_object_types';

export const headerMidMenuSv: Menu = {
    id: '1',
    name: 'Header mittenmeny',
    link: '',
    isMenu: true,
    items: [
        {
            id: '100',
            name: 'Engagera dig',
            link: '/engagera-dig',
            isMenu: false
        },
        {
            id: '101',
            name: 'Nyheter',
            link: '/nyheter',
            isMenu: false
        },
        {
            id: '102',
            name: 'Event',
            link: '/engagera-dig',
            isMenu: false
        },
        {
            id: '103',
            name: 'Sektionen',
            link: '/om-sektionen',
            isMenu: false
        }
    ]
};

export const headerMidMenuEn: Menu = {
    id: '1',
    name: 'Header mid menu',
    link: '',
    isMenu: true,
    items: [
        {
            id: '200',
            name: 'Get involved',
            link: '/engagera-dig',
            isMenu: false
        },
        {
            id: '201',
            name: 'News',
            link: '/nyheter',
            isMenu: false
        },
        {
            id: '202',
            name: 'Events',
            link: '/engagera-dig',
            isMenu: false
        },
        {
            id: '203',
            name: 'The Chapter',
            link: '/om-sektionen',
            isMenu: false
        }
    ]
};

export const engageraDigSv: Menu = {
    id: '1',
    name: 'Engagera dig',
    link: '',
    isMenu: true,
    items: [
        { id: '200', name: 'Vad kan du göra?', link: '/engagera-dig', isMenu: false },
        { id: '200', name: 'Spexet Fysikalen', link: '/fysikalen', isMenu: false },
        { id: '200', name: 'Klubbmästeriet', link: '/fkm', isMenu: false },
        { id: '200', name: 'Skriv i The Force', link: '/the-force', isMenu: false },
        { id: '200', name: 'Sök en post', link: '/sok', isMenu: false }
    ]
};

export const engageraDigEn: Menu = {
    id: '1',
    name: 'Get involved',
    link: '',
    isMenu: true,
    items: [
        { id: '200', name: 'What could you do?', link: '/engagera-dig', isMenu: false },
        { id: '200', name: 'The spex - Fysikalen', link: '/fysikalen', isMenu: false },
        { id: '200', name: 'Event committee', link: '/fkm', isMenu: false },
        { id: '200', name: 'Write in The Force', link: '/the-force', isMenu: false },
        { id: '200', name: 'Apply for a position', link: '/sok', isMenu: false }
    ]
};

export const nyheterSv: Menu = {
    id: '1',
    name: 'Nyheter',
    link: '',
    isMenu: true,
    items: [
        { id: '200', name: 'Alla nyheter', link: '/nyheter', isMenu: false }
    ]
};

export const nyheterEn: Menu = {
    id: '1',
    name: 'News',
    link: '',
    isMenu: true,
    items: [
        { id: '200', name: 'All news', link: '/nyheter', isMenu: false }
    ]
};

export const eventSv: Menu = {
    id: '1',
    name: 'Event',
    link: '',
    isMenu: true,
    items: [
        { id: '200', name: 'Lista över event', link: '/event', isMenu: false }
    ]
};

export const eventEn: Menu = {
    id: '1',
    name: 'Event',
    link: '',
    isMenu: true,
    items: [
        { id: '200', name: 'List of events', link: '/event', isMenu: false }
    ]
};

export const sektionenSv: Menu = {
    id: '1',
    name: 'Sektionen',
    link: '',
    isMenu: true,
    items: [
        { id: '200', name: 'Vad är fysiksektionen?', link: '/om-sektionen', isMenu: false },
        { id: '200', name: 'Styrelsen', link: '/styret', isMenu: false },
        { id: '200', name: 'Nämnderna', link: '/namnder', isMenu: false }
    ]
};

export const sektionenEn: Menu = {
    id: '1',
    name: 'The chapter',
    link: '',
    isMenu: true,
    items: [
        { id: '200', name: 'What is the Physics Chapter', link: '/om-sektionen', isMenu: false },
        { id: '200', name: 'The board', link: '/styret', isMenu: false },
        { id: '200', name: 'The committees', link: '/namnder', isMenu: false }
    ]
};

export const resurserSv: Menu = {
    id: '1',
    name: 'Resurser',
    link: '',
    isMenu: true,
    items: [
        { id: '200', name: 'Styrdokument', link: '/styrdokument', isMenu: false },
        { id: '200', name: 'Möteshandlingar', link: '/moteshandlingar', isMenu: false },
        { id: '200', name: 'Grafiskt material', link: '/grafiskt-material', isMenu: false }
    ]
};

export const resurserEn: Menu = {
    id: '1',
    name: 'Resources',
    link: '',
    isMenu: true,
    items: [
        { id: '200', name: 'Governing documents', link: '/styrdokument', isMenu: false },
        { id: '200', name: 'Meeting documents', link: '/moteshandlingar', isMenu: false },
        { id: '200', name: 'Graphic material', link: '/grafiskt-material', isMenu: false }
    ]
};

export const kontakterSv: Menu = {
    id: '1',
    name: 'Kontakter',
    link: '',
    isMenu: true,
    items: [
        { id: '200', name: 'Snabbkontakter', link: '/kontakt', isMenu: false },
        { id: '200', name: 'Alla på sektionen', link: '/kontakt-alla', isMenu: false }
    ]
};

export const kontakterEn: Menu = {
    id: '1',
    name: 'Contact',
    link: '',
    isMenu: true,
    items: [
        { id: '200', name: 'Common contacts', link: '/kontakt', isMenu: false },
        { id: '200', name: 'Everyone in the chapter', link: '/kontakt-alla', isMenu: false }
    ]
};

export const mainMenuSv: Menu = {
    id: '1',
    name: 'Kontakter',
    link: '',
    isMenu: true,
    items: [
        engageraDigSv,
        nyheterSv,
        eventSv,
        sektionenSv,
        resurserSv,
        kontakterSv
    ]
};

export const mainMenuEn: Menu = {
    id: '1',
    name: 'Kontakter',
    link: '',
    isMenu: true,
    items: [
        engageraDigEn,
        nyheterEn,
        eventEn,
        sektionenEn,
        resurserEn,
        kontakterEn
    ]
};
