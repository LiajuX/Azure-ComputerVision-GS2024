const defaultImages = [
    'https://cdn.shopify.com/s/files/1/0073/8269/6034/files/energia-solar-fotovoltaica-paineis-solares_1024x1024.jpg?v=1589396409',
    'https://solarprime.com.br/wp-content/uploads/2022/12/post_thumbnail-4cba05d81e1e8b18b6836ba70bd4d251.jpeg.webp',
    'https://blog.renovigi.com.br/wp-content/uploads/painel-01.jpeg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyfFebPyUruf1BGAnz7S_MjmudSduExpZUyw&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpdXcAhm58t_l-m5sm1mdMiYwsJagTAM_dWg&s',
    'https://amazoniareal.com.br/wp-content/uploads/2019/06/UHE-JIRAU-Marcos-Antonio-Grutzmacher-2.jpg',
    'https://static.mundoeducacao.uol.com.br/mundoeducacao/2023/06/barragem-de-uma-usina-hidreletrica.jpg',
];

export function randomImageUrl() {
    return defaultImages[Math.floor(Math.random() * Math.floor(defaultImages.length))];
}
