const onHeadshotClick = () => {
  window.location.href = `https://jasonwa.ng`;
};

const contents = `
- When we depict evil / necromantic cities in modern day gaming or art, we usually use bones and tattered canvas / hide, and make them look very barbaric. But [looking at this picture](https://www.instagram.com/p/Cjz71ckKgQO/?igshid=YmMyMTA2M2Y=) ([@dao.travel](https://www.instagram.com/dao.travel/) is amazing and I highly recommend following), you can kind of think of wood architecture as the same thing — effectively, massacring trees and showcasing their dead bodies in an incredibly beautiful, aesthetic designs. Why don't fantasty depictions of necromantic / evil cities do the same with characteristically dark materials, such as bone, sinew, hide, etc? That would lend a very uneasy horror, since we would have to reconcile a clear aesthetic sense of beauty with utter amorality.
- We live in an age where we, as technologists, have the most individual power and leverage to move the world in the history of humanity. It's absolutely amazing to be alive right now and be able to make the changes I want to see in the world. I don't get why everyone isn't interested in working on all these cool problems in construction, climate, government, etc.
- I miss painting — there's no way to appreciate a scene and pay attention to as many details as you do when you paint. Even if you just sit down and stare, it's so hard to notice the details of the texture of the leaves on the trees, and the rock, and the sea. Goal: buy a tiny watercolor book + paint brush + palette like that couple I saw in Acadia, and bring it with me on vacations.
- There's a pretty big distinction between working with / trusting / relying upon your subconscious, and being driven by your feelings. The former is great since it basically acts as a cache, similar to our instinctual reactions, reducing our need to invest effort & attention (which we don't want to waste). The latter leads you to make bad decisions.
- Capturing the quintessential essence of my thoughts and attitudes and beliefs so that I remember them in the future is actually pretty hard. It isn't as simple as writing my thoughts down — there's underlying modes of perception and belief systems that change over time, and to fully contextualize thoughts you need to capture that hidden essence as well.
- That's a cool microblog: https://udara.io/reinventing-this-blog
- Exercise is [a celebration](https://external-preview.redd.it/VDPvosbeTFKlG1CXSzynW6L-ifguJBMw8TFBeshnX68.jpg?auto=webp&s=88c3da021cc0f3003992ddc6e5904221ceb0c119) of what you can do, not a punishment for maintaining your body.
- Wouldn't it be cool to own a farm where all the ingredients are pre-1940s breeding programs (e.g. heirloom tomatoes and heritage-breed chickens)? Yes, all crops nowadays were "genetically modified" (phenotypes selected for by people), but I wonder if the selection criteria was broader / more holistic than that of the modern-day.
`;

const parsedFile = marked.parse(contents);

const confettiContainer = document.querySelector(".confetti-container");

console.log(`Confetti container:`, confettiContainer);

confettiContainer.innerHTML = parsedFile;
