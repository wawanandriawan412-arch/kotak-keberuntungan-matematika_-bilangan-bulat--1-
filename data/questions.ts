
import { Question } from '../types';

export const QUESTIONS: Question[] = [
  { id: 1, type: 'question', title: 'Suhu Udara', description: 'Suhu awal 30°C, lalu turun 35°C. Berapa suhu sekarang?', answer: -5, points: 10 },
  { id: 2, type: 'question', title: 'Kapal Selam', description: 'Sebuah kapal selam berada di kedalaman 20m (-20m). Jika turun lagi 30m, di posisi mana kapal sekarang?', answer: -50, points: 10 },
  { id: 3, type: 'question', title: 'Hutang & Bayar', description: 'Budi punya hutang 50.000 (-50.000). Ia membayar 20.000. Berapa sisa hutang Budi?', answer: -30000, points: 15 },
  { id: 4, type: 'zonk', title: 'ZONK!', description: 'Aduh! Kotak ini berisi jebakan. Poin berkurang 10!', points: -10 },
  { id: 5, type: 'bonus', title: 'BONUS!', description: 'Hore! Kamu beruntung. Poin gratis +50!', points: 50 },
  { id: 6, type: 'question', title: 'Temperatur Es', description: 'Suhu es batu -5°C. Dibiarkan di luar hingga naik 12°C. Berapa suhu es sekarang?', answer: 7, points: 10 },
  { id: 7, type: 'question', title: 'Lift Gedung', description: 'Andi berada di lantai 2. Ia turun 5 lantai untuk ke parkiran bawah tanah. Di lantai berapa Andi sekarang?', answer: -3, points: 10 },
  { id: 8, type: 'question', title: 'Perkalian Negatif', description: 'Berapakah hasil dari -4 x 8?', answer: -32, points: 15 },
  { id: 9, type: 'zonk', title: 'ZONK!', description: 'Ups! Terperangkap di kotak kosong. -5 poin.', points: -5 },
  { id: 10, type: 'question', title: 'Pembagian Bilangan', description: 'Berapakah hasil dari -40 : (-5)?', answer: 8, points: 15 },
  { id: 11, type: 'bonus', title: 'SUPER BONUS!', description: 'Ledakan Poin! +100 poin untukmu!', points: 100 },
  { id: 12, type: 'question', title: 'Gabungan', description: 'Hitunglah: (-10) + 5 - (-3) = ...', answer: -2, points: 20 },
  { id: 13, type: 'question', title: 'Suhu Puncak', description: 'Di siang hari suhu 15°C, malam harinya suhu menjadi -2°C. Berapa selisih penurunannya?', answer: 17, points: 20 },
  { id: 14, type: 'zonk', title: 'ZONK!', description: 'Kotak ini meledak! -15 poin.', points: -15 },
  { id: 15, type: 'question', title: 'Toko Kelontong', description: 'Toko rugi 200.000 hari ini, tapi untung 500.000 besoknya. Berapa posisi keuangan total?', answer: 300000, points: 15 },
  { id: 16, type: 'bonus', title: 'REJEKI NOMPLOK', description: 'Selamat! Kamu dapat tambahan +30 poin.', points: 30 },
  { id: 17, type: 'question', title: 'Garis Bilangan', description: 'Dari titik 0, melangkah ke kiri 7 satuan lalu ke kanan 10 satuan. Di titik mana sekarang?', answer: 3, points: 15 },
  { id: 18, type: 'question', title: 'Perkalian Campuran', description: 'Berapakah hasil dari (-6) x (-7)?', answer: 42, points: 15 },
  { id: 19, type: 'zonk', title: 'LUBANG HITAM', description: 'Poinmu tersedot! -20 poin.', points: -20 },
  { id: 20, type: 'question', title: 'Operasi Pembagian', description: 'Hasil dari 144 : (-12) adalah...', answer: -12, points: 15 },
  { id: 21, type: 'question', title: 'Suhu Freezer', description: 'Suhu awal freezer 4°C. Setelah dinyalakan turun 10°C. Berapa suhu sekarang?', answer: -6, points: 10 },
  { id: 22, type: 'bonus', title: 'KOTAK AJAIB', description: 'Selamat! Kamu menemukan harta karun +75 poin.', points: 75 },
  { id: 23, type: 'question', title: 'Soal Cerita', description: 'Seorang penyelam di -15m naik 8m. Dimana posisi penyelam sekarang?', answer: -7, points: 15 },
  { id: 24, type: 'question', title: 'Matematika Dasar', description: 'Hasil dari -25 + (-15) adalah...', answer: -40, points: 10 }
];
