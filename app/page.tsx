"use client";

import { useEffect, useRef, useState } from "react";
import { Bars3Icon, PencilSquareIcon, XMarkIcon, PlusIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";

const DEFAULT_AVATAR =
  "https://ui-avatars.com/api/?name=User&background=6c63ff&color=fff&size=256";

function getInitial<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const val = localStorage.getItem(key);
    if (!val) return fallback;
    return JSON.parse(val);
  } catch {
    return fallback;
  }
}

export default function Linktree() {
  // Profile State
  const [avatar, setAvatar] = useState<string>(() => getInitial("avatar", DEFAULT_AVATAR));
  const [name, setName] = useState<string>(() => getInitial("name", "Jacob22092"));
  const [bio, setBio] = useState<string>(() => getInitial("bio", "Krótki opis o mnie, np. Frontend Developer"));
  const [theme, setTheme] = useState<"dark" | "light">(() => getInitial("theme", "dark"));

  // Links State
  const [links, setLinks] = useState<{ title: string; url: string }[]>(() =>
    getInitial("links", [
      { title: "GitHub", url: "https://github.com/Jacob22092" },
      { title: "LinkedIn", url: "https://linkedin.com/in/twoj-profil" },
      { title: "Portfolio", url: "https://twoja-strona.pl" },
    ])
  );

  // Edit Mode State
  const [editMode, setEditMode] = useState(false);
  const [newLinkTitle, setNewLinkTitle] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");
  const [dragIdx, setDragIdx] = useState<number | null>(null);

  // Save to localStorage
  useEffect(() => { localStorage.setItem("avatar", JSON.stringify(avatar)); }, [avatar]);
  useEffect(() => { localStorage.setItem("name", JSON.stringify(name)); }, [name]);
  useEffect(() => { localStorage.setItem("bio", JSON.stringify(bio)); }, [bio]);
  useEffect(() => { localStorage.setItem("theme", JSON.stringify(theme)); }, [theme]);
  useEffect(() => { localStorage.setItem("links", JSON.stringify(links)); }, [links]);

  // Avatar upload
  const fileInput = useRef<HTMLInputElement>(null);
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setAvatar(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  // Link CRUD
  function handleAddLink(e: React.FormEvent) {
    e.preventDefault();
    if (!newLinkTitle.trim() || !newLinkUrl.trim()) return;
    setLinks([...links, { title: newLinkTitle, url: newLinkUrl }]);
    setNewLinkTitle("");
    setNewLinkUrl("");
  }
  function handleRemoveLink(idx: number) {
    setLinks(links.filter((_, i) => i !== idx));
  }
  function handleEditLink(idx: number, field: "title" | "url", val: string) {
    setLinks(links.map((link, i) => i === idx ? { ...link, [field]: val } : link));
  }
  function handleMoveLink(idx: number, dir: -1 | 1) {
    if (idx + dir < 0 || idx + dir >= links.length) return;
    const arr = [...links];
    [arr[idx], arr[idx + dir]] = [arr[idx + dir], arr[idx]];
    setLinks(arr);
  }

  // Drag & Drop
  function handleDragStart(idx: number) { setDragIdx(idx); }
  function handleDragEnter(idx: number) {
    if (dragIdx === null || dragIdx === idx) return;
    const arr = [...links];
    const [dragged] = arr.splice(dragIdx, 1);
    arr.splice(idx, 0, dragged);
    setLinks(arr);
    setDragIdx(idx);
  }
  function handleDragEnd() { setDragIdx(null); }

  // Theme toggle
  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  // Advanced styling (Tailwind CSS)
  return (
    <div className="min-h-screen flex flex-col items-center px-2 py-8 bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 dark:text-white text-gray-900 transition-colors">
      <div className="w-full max-w-xl bg-white/80 dark:bg-gray-900/90 rounded-3xl shadow-2xl p-8 pb-4 backdrop-blur border border-gray-200 dark:border-gray-800">
        {/* Profile */}
        <div className="flex flex-col items-center gap-2 mb-6">
          <div
            className="relative group cursor-pointer"
            onClick={() => editMode && fileInput.current?.click()}
            title={editMode ? "Kliknij, by zmienić avatar" : ""}
          >
            <img src={avatar || DEFAULT_AVATAR} alt="Avatar"
              className="w-28 h-28 rounded-full border-4 border-indigo-400 shadow-lg object-cover bg-white" />
            {editMode && (
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <ArrowUpTrayIcon className="w-7 h-7 text-white" />
              </div>
            )}
            <input ref={fileInput} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          </div>
          {editMode ? (
            <>
              <input
                className="text-2xl font-bold text-center mt-2 bg-transparent border-b-2 border-indigo-200 dark:border-indigo-700 focus:outline-none focus:border-indigo-500 transition w-full"
                value={name} onChange={e => setName(e.target.value)} maxLength={32}
              />
              <textarea
                className="mt-1 text-center bg-transparent border-b-2 border-gray-200 dark:border-gray-700 focus:outline-none focus:border-indigo-400 transition w-full resize-none"
                value={bio} onChange={e => setBio(e.target.value)} maxLength={100}
              />
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold mt-2">{name}</h1>
              <p className="text-gray-500 dark:text-gray-300 text-center">{bio}</p>
            </>
          )}
        </div>
        {/* Links */}
        <div className="mb-6 flex flex-col gap-3">
          {links.length === 0 && !editMode && (
            <div className="text-center py-4 text-gray-400">Brak linków.</div>
          )}
          {links.map((link, i) => (
            <div
              key={i}
              className={`flex items-stretch group rounded-xl bg-indigo-50 dark:bg-indigo-950/60 shadow transition hover:scale-[1.015] hover:bg-indigo-100 dark:hover:bg-indigo-900 border border-indigo-100 dark:border-indigo-900
                ${editMode ? "cursor-grab" : ""}`}
              draggable={editMode}
              onDragStart={() => handleDragStart(i)}
              onDragEnter={() => editMode && handleDragEnter(i)}
              onDragEnd={handleDragEnd}
              tabIndex={0}
            >
              {editMode ? (
                <>
                  <Bars3Icon className="w-6 h-6 my-auto mx-2 text-indigo-400 dark:text-indigo-400 cursor-move" />
                  <input
                    className="flex-1 py-2 px-2 rounded-l-xl bg-transparent border-none text-base font-semibold focus:outline-none"
                    value={link.title}
                    onChange={e => handleEditLink(i, "title", e.target.value)}
                    maxLength={32}
                  />
                  <input
                    className="flex-1 py-2 px-2 bg-transparent border-none text-sm focus:outline-none"
                    value={link.url}
                    onChange={e => handleEditLink(i, "url", e.target.value)}
                    maxLength={128}
                  />
                  <button type="button" onClick={() => handleMoveLink(i, -1)}
                    className="px-2 text-indigo-300 hover:text-indigo-700 disabled:opacity-40" disabled={i === 0} title="W górę">▲</button>
                  <button type="button" onClick={() => handleMoveLink(i, 1)}
                    className="px-2 text-indigo-300 hover:text-indigo-700 disabled:opacity-40" disabled={i === links.length - 1} title="W dół">▼</button>
                  <button type="button" onClick={() => handleRemoveLink(i)}
                    className="px-2 text-red-400 hover:text-red-700" title="Usuń"><XMarkIcon className="w-5 h-5" /></button>
                </>
              ) : (
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 font-semibold text-indigo-800 dark:text-indigo-200 text-center select-none rounded-xl transition-colors"
                >
                  {link.title}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Add Link Form */}
        {editMode && (
          <form onSubmit={handleAddLink} className="flex gap-2 mb-6">
            <input
              className="flex-1 px-3 py-2 rounded-lg border border-indigo-100 dark:border-indigo-900 bg-white dark:bg-indigo-950 placeholder:text-gray-400 dark:placeholder:text-gray-500"
              placeholder="Nazwa linku"
              value={newLinkTitle}
              onChange={e => setNewLinkTitle(e.target.value)}
              maxLength={32}
              required
            />
            <input
              className="flex-1 px-3 py-2 rounded-lg border border-indigo-100 dark:border-indigo-900 bg-white dark:bg-indigo-950 placeholder:text-gray-400 dark:placeholder:text-gray-500"
              placeholder="https://adres-strony.pl"
              value={newLinkUrl}
              onChange={e => setNewLinkUrl(e.target.value)}
              maxLength={128}
              required
            />
            <button
              type="submit"
              className="px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white flex items-center"
              aria-label="Dodaj link"
              title="Dodaj link"
            >
              <PlusIcon className="w-5 h-5" />
            </button>
          </form>
        )}

        {/* Controls */}
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-2">
            <label className="flex items-center cursor-pointer select-none">
              <span className="mr-2 text-sm">Tryb:</span>
              <select
                className="rounded border border-indigo-200 dark:border-indigo-800 bg-white/80 dark:bg-indigo-950 text-sm px-2 py-1"
                value={theme}
                onChange={e => setTheme(e.target.value as "light" | "dark")}
              >
                <option value="dark">Ciemny</option>
                <option value="light">Jasny</option>
              </select>
            </label>
          </div>
          <button
            className={`flex items-center gap-1 px-5 py-2 rounded-lg text-white font-bold transition ${editMode ? "bg-green-600 hover:bg-green-700" : "bg-indigo-600 hover:bg-indigo-700"}`}
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? (
              <>
                <span>Zakończ edycję</span>
                <XMarkIcon className="w-5 h-5" />
              </>
            ) : (
              <>
                <span>Edytuj profil</span>
                <PencilSquareIcon className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
      {/* Footer */}
      <footer className="mt-8 text-xs text-gray-400 text-center opacity-80">
        Linktree by Jacob22092 – Next.js + localStorage demo
      </footer>
    </div>
  );
}