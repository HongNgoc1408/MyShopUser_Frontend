import React, { useState } from "react";
import ImageSearchForm from "../../components/ImageSearch/ImageSearchForm";
import ImageService from "../../services/ImageService";

const ImageSearch = () => {
  const [results, setResults] = useState(null);
  const convertImageToPixels = (image) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const img = new Image();
      img.onload = () => {
        canvas.width = 28;
        canvas.height = 28;
        ctx.drawImage(img, 0, 0, 28, 28); // Vẽ lại ảnh lên canvas với kích thước 28x28

        const imageData = ctx.getImageData(0, 0, 28, 28);
        const pixels = [];

        // Duyệt qua các pixel, lấy giá trị sáng (grayscale) từ các giá trị RGB
        for (let i = 0; i < imageData.data.length; i += 4) {
          const gray = Math.floor(
            (imageData.data[i] +
              imageData.data[i + 1] +
              imageData.data[i + 2]) /
              3
          );
          pixels.push(gray); // Thêm giá trị pixel vào mảng
        }

        resolve(pixels); // Trả về mảng pixel
      };

      img.onerror = reject;
      img.src = URL.createObjectURL(image); // Đảm bảo ảnh được load từ input
    });
  };
  const handleSearch = async (image) => {
    const imagePixels = await convertImageToPixels(image); // Convert image to pixel data
    // console.log(imagePixels); // Log the pixel array to verify the format

    // const data = { imagePixels }; // Send imagePixels as an object with an array
    try {
      // console.log("data", data);
      const response = await ImageService.search(imagePixels); // Send request to API
      // console.log(response);
      setResults(response.data); // Set results after receiving response
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Fashion-MNIST Image Search</h1>
      <ImageSearchForm onSearch={handleSearch} />
      {results && (
        <div>
          <h2>Predicted Label: {results.label}</h2>
          <ul>
            {results.products.map((product) => (
              <li key={product.id}>{product.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageSearch;
