export function loadWeatherIcon(dayPhase: string, conditionCode: number): string {
  // Create a context for all images in the icons folder
  const images = require.context('/public/icons', true, /\.png$/); // Adjust the path based on your project structure

  // Construct the image path based on dayPhase and conditionCode
  const imagePath = `./${dayPhase}/${conditionCode}.png`;

  // Check if the constructed image path exists in the context
  if (images.keys().includes(imagePath)) {
    return images(imagePath); // Return the found image
  }

  // Fallback image if the specific image is not found
  return images('./undefined.png'); // Ensure you have an undefined.png in your folder
}