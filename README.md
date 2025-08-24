# ShareHub


Welcome to **ShareHub** – your next-generation solution for seamless file sharing and collaboration. ShareHub provides a modern, responsive interface built with React and Next.js, making it easy to upload, list, and manage files across your devices.

---

## 🌟 Introduction

**ShareHub** is designed to make sharing files between devices easy, fast, and secure. With an intuitive UI, real-time updates, and customizable themes, ShareHub is perfect for teams, classrooms, or anyone who needs to transfer files effortlessly.

---

## ✨ Features

- **Drag & Drop File Uploads**  
  Effortlessly upload files with a simple drag-and-drop interface.

- **File Listing & Management**  
  View, organize, and manage your shared files in a beautiful card-based layout.

- **Server Info & Connectivity**  
  Display server status, QR codes for quick connections, and network info.

- **Ambient UI Effects**  
  Dynamic backgrounds and smooth animations for a pleasant user experience.

- **Theme Toggle**  
  Switch between light and dark modes to suit your environment.

- **Reusable UI Components**  
  Includes alerts, badges, buttons, cards, and progress bars, all built with accessibility in mind.

---

## 📦 Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/your-username/sharehub.git
    cd sharehub
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Run the development server**
    ```bash
    npm run dev
    ```

---

## 🚀 Usage

1. **Start the server**
    ```bash
    npm run dev
    ```

2. **Open your browser**
    ```
    http://localhost:3000
    ```

3. **Upload and Share Files**
   - Use the file uploader to drag & drop files.
   - View uploaded files in the file list.
   - Toggle themes for your preferred viewing experience.

---


## 📂 Project Structure

```
├─── client
│   ├─── app
│   │   ├─── api
│   │   │   ├─── delete
│   │   │   │   └─── [filename]
│   │   │   │       └─── route.ts
│   │   │   ├─── download
│   │   │   │   └─── [filename]
│   │   │   │       └─── route.ts
│   │   │   ├─── files
│   │   │   │   └─── route.ts
│   │   │   └─── upload
│   │   │       └─── route.ts
│   │   ├─── favicon.ico
│   │   ├─── globals.css
│   │   ├─── layout.tsx
│   │   └─── page.tsx
│   ├─── components
│   │   ├─── ui
│   │   │   ├─── alert.tsx
│   │   │   ├─── badge.tsx
│   │   │   ├─── button.tsx
│   │   │   ├─── card.tsx
│   │   │   ├─── progress.tsx
│   │   │   ├─── scroll-area.tsx
│   │   │   ├─── separator.tsx
│   │   │   └─── sonner.tsx
│   │   ├─── ambient.tsx
│   │   ├─── file-list.tsx
│   │   ├─── file-uploader.tsx
│   │   ├─── server-info.tsx
│   │   └─── theme-toggle.tsx
│   ├─── hooks
│   │   └─── use-toast.ts
│   ├─── lib
│   │   └─── utils.ts
│   ├─── public
│   │   ├─── file.svg
│   │   ├─── globe.svg
│   │   ├─── next.svg
│   │   ├─── vercel.svg
│   │   └─── window.svg
│   ├─── .gitignore
│   ├─── components.json
│   ├─── eslint.config.mjs
│   ├─── next.config.ts
│   ├─── package-lock.json
│   ├─── package.json
│   ├─── postcss.config.mjs
│   ├─── README.md
│   └─── tsconfig.json
├─── server
│   ├─── generate_cert.py
│   ├─── requirements.txt
│   └─── server.py
└─── .gitignore

```

## ScreenShots 

<img width="1904" height="884" alt="image" src="https://github.com/user-attachments/assets/3b165b10-b80d-4507-ab07-786f2c913907" />
