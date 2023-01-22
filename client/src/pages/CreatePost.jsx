import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./Home.module.css";
import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImage, setGeneratingImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImage(true);
        const response = await fetch(
          "https://pixel-rave.onrender.com/api/v1/pxrave",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: form.prompt }),
          }
        );
        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImage(false);
      }
    } else
      alert(
        "This ugly box is what you get, when you try to be cheeky. Enter a prompt!"
      );
  };

  const handleChange = (evt) => {
    setForm({ ...form, [evt.target.name]: evt.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (form.prompt && form.photo) {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://pixel-rave.onrender.com/api/v1/post",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          }
        );
        await response.json();
        navigate("/");
      } catch (err) {
        alert(err);
      } finally {
        setIsLoading(false);
      }
    } else
      alert(
        "Can't share nothing homie, write something and ask me to draw that first. No image has been generated."
      );
  };

  return (
    <section className={`max-w-7xl mx-auto ${classes["home-intro"]}`}>
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          Let's get going, shall we...
        </h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
          Create unique and visually striking artwork and share it with the
          online community.
        </p>
      </div>
      <form className="mt-8 max-w3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Enter your name..."
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A comic book cover of a superhero wearing headphones"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}
            {generatingImage && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className="text-white bg-amber-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5"
            disabled={generatingImage}
          >
            {generatingImage ? "Generating..." : "Generate"}
          </button>
        </div>
        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            Once you have generated the desired image, share it with the online
            community for others to see.
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-teal-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            disabled={isLoading}
          >
            {isLoading ? "Sharing..." : "Share with the community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
