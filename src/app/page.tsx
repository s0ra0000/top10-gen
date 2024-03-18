"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import html2canvas from "html2canvas";
import { useState, useRef } from "react";
// @ts-ignore
import { useScreenshot } from "use-react-screenshot";

type Item = {
  id: number;
  img: string;
  name: string;
  score: number | undefined;
  change: "up" | "down" | "not changed";
  placesChanged: number;
};

type Visibility = {
  index: boolean;
  img: boolean;
  name: boolean;
  score: boolean;
  change: boolean;
};
export default function Home() {
  const imageRef = useRef(null);
  const [image, takeScreenshot, isLoading, clear] = useScreenshot({
    ref: imageRef,
  });
  const getImage = () => takeScreenshot(imageRef.current);

  const [title, setTitle] = useState<string>("");
  const [items, setItems] = useState<Item[]>([]);
  const [width, setWidth] = useState<string>("800");
  const [newItem, setNewItem] = useState<Omit<Item, "id">>({
    img: "",
    name: "",
    score: undefined,
    change: "not changed",
    placesChanged: 0,
  });
  const [visibility, setVisibility] = useState({
    index: true,
    img: true,
    name: true,
    score: true,
    change: true,
  });

  const handleAddItem = () => {
    setItems((prev) => [...prev, { ...newItem, id: prev.length + 1 }]);
    setNewItem({
      img: "",
      name: "",
      score: 0,
      change: "not changed",
      placesChanged: 0,
    });
  };

  const handleChangeVisibility = (field: keyof Visibility) => {
    setVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const ToCaptureRef = useRef<HTMLDivElement | null>(null);

  return (
    <main className="flex min-h-screen w-[1280px] flex-col items-center justify-between p-24">
      <div className="w-full flex flex-col gap-[8px]">
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <Input
          type="text"
          placeholder="Image URL"
          value={newItem.img}
          onChange={(e) => setNewItem({ ...newItem, img: e.target.value })}
          className="input input-bordered w-full max-w-xs"
        />
        <Input
          type="text"
          placeholder="Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="input input-bordered w-full max-w-xs"
        />
        <Input
          type="number"
          placeholder="Score"
          value={newItem.score}
          onChange={(e) =>
            setNewItem({ ...newItem, score: Number(e.target.value) })
          }
          className="input input-bordered w-full max-w-xs"
        />
        <select
          value={newItem.change}
          onChange={(e) =>
            setNewItem({ ...newItem, change: e.target.value as Item["change"] })
          }
          className="select select-bordered w-full max-w-xs"
        >
          <option value="up">Up</option>
          <option value="down">Down</option>
          <option value="not changed">Not Changed</option>
        </select>
        {(newItem.change === "up" || newItem.change === "down") && (
          <Input
            type="number"
            placeholder="Places Changed"
            value={newItem.placesChanged}
            onChange={(e) =>
              setNewItem({ ...newItem, placesChanged: Number(e.target.value) })
            }
            className="input input-bordered w-full max-w-xs"
          />
        )}
        <Button onClick={handleAddItem} className="btn btn-primary">
          Add Item
        </Button>
      </div>
      <div className="w-[400px]">
        <h3>Customize width:</h3>
        <Input
          type="number"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          className="mb-4"
        />
      </div>
      <div className="flex gap-2 mb-4">
        {Object.keys(visibility).map((field) => (
          <label
            key={field}
            className="label cursor-pointer justify-start gap-2"
          >
            <input
              type="checkbox"
              checked={visibility[field as keyof Visibility]}
              onChange={() => handleChangeVisibility(field as keyof Visibility)}
              className="checkbox"
            />
            Show {field}
          </label>
        ))}
      </div>

      <div
        className="flex flex-col bg-[#1b1b1b] text-white"
        style={{ width: `${width}px` }}
        ref={imageRef}
      >
        <div className="relative flex justify-center items-center h-[80px] text-2xl font-black">
          <img
            src="logo_circle.png"
            className="w-[60px] h-[60px] absolute left-5"
          />
          <p>{title}</p>
        </div>
        {items.map((item, index) => (
          <div
            key={item.id}
            className="w-full flex gap-2 lg:gap-12 flex-row items-center  even:bg-[#2c2c2c] rounded pr-[2px] lg:pr-[10px] my-2"
          >
            <div className="w-10/12 flex items-center">
              <div className="aspect-square w-[40px] lg:w-[80px] flex-none flex items-center justify-center text-[28px]">
                {visibility.index && (
                  <span
                    className={`${
                      index === 0
                        ? "text-[#FFD700] font-black"
                        : index === 1
                        ? "text-[#c0c0c0] font-black"
                        : index === 2
                        ? "text-[#cd7f32] font-black"
                        : "text-white"
                    }`}
                  >
                    {index + 1}
                  </span>
                )}
              </div>
              <div className="relative w-[40px] flex items-center lg:w-[80px] aspect-square flex-none ">
                {visibility.img && <img src={item.img} alt={item.name} />}
              </div>
              <div className="text-left ml-[10px] lg:ml-[25px] grow flex flex-col justify-center">
                <div className="text-xs lg:text-xl lg:font-semibold line-clamp-2">
                  {visibility.name && <span>{item.name}</span>}
                </div>
              </div>
            </div>
            {visibility.score && <span>{item.score}</span>}
            <div className="relative lg:w-[50px] lg:h-[50px] h-[32px] w-[32px] flex justify-center items-center">
              {/* <BsArrowUpSquareFill className={`w-full h-full ${rankChangeStyle}`} /> */}
              <p className={`text-center text-xs lg:text-[24px] `}>
                {visibility.change && (
                  <span
                    className={
                      item.change === "up"
                        ? "text-[#48E260]"
                        : item.change === "down"
                        ? "text-[#FF4D4D]"
                        : "text-[#FFB84D]"
                    }
                  >
                    {item.change === "up"
                      ? "+"
                      : item.change === "down"
                      ? ""
                      : "~"}
                    {item.change !== "not changed" && `${item.placesChanged}`}
                  </span>
                )}
              </p>
            </div>
          </div>
        ))}
        <div className="text-center mt-2">
          <p className="font-bold ">www.trendz.mn</p>
          <p>&#160;</p>
        </div>
      </div>
      <button style={{ marginBottom: "10px" }} onClick={getImage}>
        Take screenshot
      </button>
      <img width={width} src={image} alt={"Screenshot"} />
    </main>
  );
}
