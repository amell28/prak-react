import { useState } from "react";
import frameworkData from "./framework.json";

export default function FrameworkListSearchFilter() {
  /** Deklrasai state **/
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  /** Deklrasai Logic Search & Filter **/
  const _searchTerm = searchTerm.toLowerCase();
  const filteredFrameworks = frameworkData.filter((framework) => {
    const matchesSearch =
      framework.name.toLowerCase().includes(_searchTerm) ||
      framework.description.toLowerCase().includes(_searchTerm) ||
      framework.details.developer.toLowerCase().includes(_searchTerm) ||
      framework.details.releaseYear.toString().includes(_searchTerm);

    const matchesTag = selectedTag
      ? framework.tags.includes(selectedTag)
      : true;

    return matchesSearch && matchesTag;
  });

  /** Deklarasi pengambilan unique tags di frameworkData **/
  const allTags = [
    ...new Set(frameworkData.flatMap((framework) => framework.tags)),
  ];

  return (
    <div className="min-h-screen bg-pink-50 p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <input
          type="text"
          name="searchTerm"
          placeholder="Search framework..."
          className="w-full p-2 border border-gray-300 rounded mb-4"
          onChange={(e)=>setSearchTerm(e.target.value)}
        />

        <select
          name="selectedTag"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          onChange={(e)=>setSelectedTag(e.target.value)}
        >
          <option value="">All Tags</option>
          {allTags.map((tag, index) => (
            <option key={index} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        {filteredFrameworks.map((item) => (
          <div
            key={item.id}
            className="bg-white/80 backdrop-blur-sm border border-pink-100 p-8 rounded-3xl shadow-lg shadow-pink-100/50 hover:shadow-2xl hover:shadow-pink-200/60 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-3xl font-extrabold tracking-tight text-pink-900 font-serif">
                {item.name}
              </h2>
              <a
                href={item.details.officialWebsite}
                className="text-sm font-semibold text-white bg-pink-500 hover:bg-pink-600 px-6 py-2.5 rounded-full shadow-md shadow-pink-200 transition-colors"
                target="_blank"
              >
                Visit Website
              </a>
            </div>

            <p className="text-pink-800/80 mb-6 leading-relaxed text-lg">
              {item.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-5 border-t border-pink-100">
              {/* Badge Info Developer: Pink Bold */}
              <div className="text-sm font-bold text-pink-700 bg-pink-100 px-4 py-2 rounded-xl">
                Created by {item.details.developer}
                <span className="font-medium text-pink-500">
                  {" "}
                  ({item.details.releaseYear})
                </span>
              </div>

              {/* Tags: Soft Pink */}
              <div className="flex gap-2.5">
                {item.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs font-semibold text-pink-600 bg-white border border-pink-100 px-3 py-1.5 rounded-full shadow-inner"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
