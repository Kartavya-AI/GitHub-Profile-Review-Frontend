// module.exports = {
//   theme: {
//     extend: {
//       keyframes: {
//         shimmer: {
//           "0%": { transform: "translateX(-100%)" },
//           "100%": { transform: "translateX(100%)" },
//         },
//       },
//       animation: {
//         shimmer: "shimmer 2s infinite linear",
//       },
//     },
//   },
// };
module.exports = {
  theme: {
    extend: {
      keyframes: {
        textShimmer: {
          "0%, 100%": { backgroundPosition: "200% center" },
          "50%": { backgroundPosition: "0% center" },
        },
      },
      animation: {
        textShimmer: "textShimmer 3s ease-in-out infinite",
      },
      backgroundImage: {
        'shimmer-gradient': 'linear-gradient(90deg, #8B008B 0%, #0000FF 50%, #8B008B 100%)', // dark pink and blue
      },
      backgroundSize: {
        shimmer: '200% 100%',
      },
    },
  },
};
