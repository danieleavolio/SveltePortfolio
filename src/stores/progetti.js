import { readable } from 'svelte/store';

export let progetti = readable([
	{
		nome: 'Donkey Kong AI',
		tipo: 'Gioco + Intelligenza Artificiale',
		descrizione:
			'Gioco sviluppato per l`esame di intelligenza artificiale utilizzando DLV e EmbAsp per gestire la logica del gioco e di tutti gli ostacoli che erano presenti all`interno del progetto',
		immagine: 'donkeykong.jpg',
		repo: 'https://github.com/lovaion/DonkeyKongAI'
	},
	{
		nome: 'Game Syllabus',
		tipo: 'Full-stack Sito Web per videogiochi',
		descrizione:
			'Sito Web realizzato per il progetto di Sistemi Informativi per il Web e Ingegneria del Software, utilizzando Java come Backend con Spring Boot e PostgreSQL come Database, mentre il frontend è tutto HMTL,CSS e JS puri.',
		immagine: 'gsillabus.png',
		repo: 'https://github.com/lovaion/Game-Syllabus'
	},
	{
		nome: 'Personal Portfolio',
		tipo: 'Sito realizzato con Svelte',
		descrizione:
			'Sito Web personale (quello che stai visualizzando ora) realizzato utilizzando come Framework Svelte e TailWind CSS.',
		immagine: 'personalPort.png',
		repo: 'https://github.com/lovaion/SveltePortfolio'
	},
	{
		nome: 'Password Generator',
		tipo: 'Generatore minimale di Password',
		descrizione:
			'Generatore di password realizzato con un design molto MINIMAL. Il tutto è stato programmato utilizzando solamente HTML,CSS e JS.',
		immagine: 'pswgen.png',
		repo: 'https://github.com/lovaion/MinimalPasswordGenerator'
	},
	{
		nome: 'I Miss My Bus',
		tipo: 'Semplice applicazione Web',
		descrizione:
			'Semplice progetto personale realizzato prendendo spunto da un progetto simile. Il sito mostra una playlist e dei suoni che ricordano i viaggi che si fanno in bus, regolabili e mutabili.',
		immagine: 'imissmybus.png',
		repo: 'https://github.com/lovaion/IMissMyBus'
	},
	{
		nome: 'Anime Hook',
		tipo: 'Catalogo di Anime usando API Pubbliche',
		descrizione:
			'Applicazione Web che sfrutta delle API pubbliche per acquisire informazioni su Anime, realizzato usando Javascript.',
		immagine: 'animehook.png',
		repo: 'https://github.com/lovaion/AnimeHook'
	},
	{
		nome: 'Hero Road',
		tipo: 'Gioco 2D in Java',
		descrizione:
			'Gioco 2D Arcade realizzato interamente con Java per il progetto di Interfacce grafiche e Programmazione ad Eventi',
		immagine: 'heroroad.png',
		repo: 'https://github.com/lovaion/Hero-Road-Java'
	},
	{
		nome: 'Game Of Life GUI',
		tipo: 'Applicazione con GUI per GOF',
		descrizione:
			'Progetto personale per la visualizzazione del gioco della vita con grafica personalizzabile, scalabile e movibile.',
		immagine: 'gofgui.png',
		repo: 'https://github.com/lovaion/GameOfLife-GUI '
	},
	{
		nome: 'Lab Network Configuration',
		tipo: 'Configurazione di rete di un laboratorio',
		descrizione:
			'Progetto per Sistemi Operativi e Reti: Sfrutta GNS3 per la configurazione di un laboratorio partendo dal calcolo degli indirizzi Ip per arrivare alla configurazione del NAT',
		immagine: 'netlab.jpg',
		repo: 'https://github.com/AlexFazio64/Sor-project-29'
	}
]);
