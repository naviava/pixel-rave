import React, { useState, useEffect } from "react";

import { Loader, Card, FormField } from "../components";

const RenderCards = ({ data, title }) => {
  if (data.length > 0)
    return data.map((post) => <Card key={post._id} {...post} />);

  return (
    <h2 className="mt-5 font-bold text-[#e8a73e] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://pixel-rave.onrender.com/api/v1/post"
        );
        if (response.ok) {
          const result = await response.json();
          setAllPosts(result.data.reverse());
        }
      } catch (err) {
        alert(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleSearchChange = (evt) => {
    clearTimeout(searchTimeout);
    setSearchText(evt.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const filteredSearchResults = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchResults(filteredSearchResults);
      }, 500)
    );
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          What others are upto...
        </h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
          Explore a curated selection of AI-generated images that showcase
          creativity and visual appeal.
        </p>
      </div>
      <div className="mt-16">
        <FormField
          labelName="Search posts"
          type="text"
          name="search"
          placeholder="Search posts..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>
      <div className="mt-10">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                You were looking for{" "}
                <span className="text-[#222328]">{searchText}</span>, and here's
                what we got...
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchResults}
                  title="Looks like luck ran out. I couldn't find anything."
                />
              ) : (
                <RenderCards data={allPosts} title="There's nothing here." />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
