const onHeadshotClick = () => {
  window.location.href = `https://jasonwa.ng`;
};

const contents = `
- Modern day gaming, movies, and art tend to depict "evil" with architectures of bone and tattered canvas / hide, to make them look very barbaric (or brutalist black stone/steel, think Mordor). But [looking at this picture](https://www.instagram.com/p/Cjz71ckKgQO/?igshid=YmMyMTA2M2Y=) ([@dao.travel](https://www.instagram.com/dao.travel/) is amazing and I highly recommend following), you can kind of think of wood architecture as effectively massacring trees and showcasing their dead bodies in an incredibly beautiful, aesthetic designs. Why aren't there more elegant yet dark architectures in film/concept art? That would lend a very uneasy horror, since we would have to reconcile a clear aesthetic sense of beauty with utter amorality.
- We live in an age where we, as technologists, have the most individual power and leverage to move the world in the history of humanity. It's absolutely amazing to be alive right now. Why isn't everyone interested in working on all these cool problems in construction, climate, government, etc?
- There's no way to appreciate a scene and pay attention to as many details as you do when you paint. Even if you just sit down and stare, it's so hard to notice the details of the texture of the leaves on the trees, and the rock, and the sea. Everyone should carry a tool they can use to zero in on the present whenever they're traveling, whether that's a tiny watercolor book, a camera, or a poetry book.
- There's a huge distinction between working with / trusting / relying upon your subconscious patterns of thought, and being driven by your feelings. The former is great since it basically acts as a cache, similar to our instinctual reactions, reducing our need to invest effort & attention (which we don't want to waste). The latter leads you to make bad decisions. Properly understanding your subconscious and recognizing when it is useful is a huge advantage.
- Capturing the quintessential essence of thoughts / attitudes / beliefs to remember in the future is actually very difficult. It isn't as simple as writing thoughts down — there's underlying modes of perception and belief systems that change over time, and to fully contextualize thoughts you need to capture that hidden essence as well.
- What a cool microblog: https://udara.io/reinventing-this-blog
- Exercise is [a celebration](https://external-preview.redd.it/VDPvosbeTFKlG1CXSzynW6L-ifguJBMw8TFBeshnX68.jpg?auto=webp&s=88c3da021cc0f3003992ddc6e5904221ceb0c119) of what you can do, not a punishment required to maintain your body.
- I'd love to own a farm where all the produce variants are from before the 1940s breeding programs (e.g. actual heirloom tomatoes and heritage-breed chickens). Even though all crops nowadays have been "genetically modified" (phenotypes selected for by people), I suspect the historical selection criteria for a "good plant" was much more holistic than those in the modern-day.
`;

const parsedFile = marked.parse(contents);

const lookingGlassContainer = document.querySelector(
  ".looking-glass-container"
);

lookingGlassContainer.innerHTML = parsedFile;
