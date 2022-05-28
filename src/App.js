//@ts-check

import { useState } from "react";
import { db } from "./db";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
const $ = (el) => document.querySelector(el);

function App() {
  const [display, setDisplay] = useState(0);
  const [modal, setModal] = useState(false);
  const [modalcontent, setModalcontent] = useState({});

  const openModal = (m) => {
    return popUp(m.title, m.content, () => setModal(false));
  };

  const praktikum = [
    { content: "Percobaan form", color: "border-l-red-400 hover:bg-red-200" },
    {
      content: "Kalkulator sederhana",
      color: "border-l-yellow-400 hover:bg-yellow-200",
    },
    {
      content: "Program hitung nilai",
      color: "border-l-green-400 hover:bg-green-200",
    },
    {
      content: "Program belanja sederhana",
      color: "border-l-sky-400 hover:bg-sky-200",
    },
    {
      content: "Program order makanan",
      color: "border-l-fuchsia-400 hover:bg-fuchsia-200",
    },
    {
      content: "Program perulangan teks",
      color: "border-l-indigo-400 hover:bg-indigo-200",
    },
    {
      content: "Program pendataan mahasiswa",
      color: "border-l-orange-400 hover:bg-orange-200",
    },
    {
      content: "Coming soon",
      color: "border-l-lime-400 hover:bg-lime-200",
    },
  ];

  const initialRender = () => (
    <div className="grid grid-cols-4 gap-4">
      {praktikum.map((el, id) => (
        <div
          key={id}
          className={
            "transition hover:scale-110 hover:rotate-3 cursor-pointer duration-200 ease-in-out hover:shadow-md border-l-[5px] p-4 rounded-md " +
            el.color
          }
          onClick={() => setDisplay(id + 1)}
        >
          <h2 className="font-bold text-xl">Praktikum {id + 1}</h2>
          <p>{el.content}</p>
        </div>
      ))}
    </div>
  );

  const TemplatePr = ({ title, children, color }) => {
    return (
      <div
        className={"flex flex-col p-5 rounded-md text-slate-800 " + color.a1}
      >
        <div className="flex mb-3">
          <h2 className="flex-1 font-bold text-xl">{title}</h2>
          <button
            className={
              "px-2 py-1 rounded-md hover:-translate-x-1 transition-all font-bold " +
              color.a2
            }
            onClick={() => setDisplay(0)}
          >
            Kembali
          </button>
        </div>
        <div className="container mx-auto p-3">{children}</div>
      </div>
    );
  };

  const pr1 = () => (
    <TemplatePr
      title={"Percobaan Form"}
      color={{ a1: "bg-red-50", a2: "bg-red-300 text-red-800" }}
    >
      <form className="grid grid-cols-2 gap-2">
        <label htmlFor="txtnama">Nama</label>
        <input
          required
          className="bg-red-100 p-1 px-2 rounded-md outline-none selection:bg-red-200"
          type="text"
          id="txtnama"
        />
        <label htmlFor="cbojeniskelamin">Jenis Kelamin</label>
        <select
          required
          className="bg-red-100 p-1 px-2 rounded-md outline-none selection:bg-red-200"
          id="cbojeniskelamin"
        >
          <option value="Laki-Laki">Laki-Laki</option>
          <option value="Perempuan">Perempuan</option>t
        </select>
        <label htmlFor="cbofakultas">Fakultas</label>
        <select
          className="bg-red-100 p-1 px-2 rounded-md outline-none selection:bg-red-200"
          required
          id="cbofakultas"
        >
          <option value="FAI">FAI</option>
          <option value="FBS">FBS</option>
          <option value="FIA">FIA</option>
          <option value="FIK">FIK</option>
          <option value="FT">FT</option>
        </select>
      </form>
      <button
        className="bg-red-500 text-white col-auto w-full py-2 mt-3 font-bold rounded-md hover:bg-red-600"
        onClick={(e) => {
          e.preventDefault();
          let form1 = [
            $("#txtnama").value,
            $("#cbojeniskelamin").value,
            $("#cbofakultas").value,
          ];

          if (form1.every((el) => el !== "")) {
            setModal(true);
            setModalcontent({
              title: "Hasil Pengisian",
              content: `${form1[0]}\n${form1[1]}\n${form1[2]}`,
            });
          }
        }}
      >
        Tampilkan pesan
      </button>
    </TemplatePr>
  );

  const handlePr2 = (e, symbol) => {
    e.preventDefault();
    let angka = [$("#angka1").value, $("#angka2").value];
    if (angka.every((el) => el === "")) return;

    $("#hasil").value = eval(`${angka[0]} ${symbol} ${angka[1]}`);
  };

  const pr2 = () => (
    <TemplatePr
      title={"Kalkulator Sederhana"}
      color={{ a1: "bg-yellow-50", a2: "bg-yellow-300 text-yellow-800" }}
    >
      <form className="grid grid-cols-2 gap-2">
        <label htmlFor="angka1">Angka Pertama</label>
        <input
          required
          type="number"
          id="angka1"
          className="bg-yellow-100 p-1 px-2 rounded-md outline-none selection:bg-yellow-200"
        />
        <label htmlFor="angka2">Angka Kedua</label>
        <input
          required
          type="number"
          id="angka2"
          className="bg-yellow-100 p-1 px-2 rounded-md outline-none selection:bg-yellow-200"
        />
        <div className="col-span-2 grid grid-cols-4 gap-2">
          <button
            className="py-1 rounded-md hover:bg-yellow-400 transition-all font-bold bg-yellow-300 text-yellow-800"
            onClick={(e) => handlePr2(e, "+")}
          >
            +
          </button>
          <button
            className="py-1 rounded-md hover:bg-yellow-400 transition-all font-bold bg-yellow-300 text-yellow-800"
            onClick={(e) => handlePr2(e, "-")}
          >
            -
          </button>
          <button
            className="py-1 rounded-md hover:bg-yellow-400 transition-all font-bold bg-yellow-300 text-yellow-800"
            onClick={(e) => handlePr2(e, "/")}
          >
            /
          </button>
          <button
            className="py-1 rounded-md hover:bg-yellow-400 transition-all font-bold bg-yellow-300 text-yellow-800"
            onClick={(e) => handlePr2(e, "*")}
          >
            X
          </button>
        </div>
        <label htmlFor="hasil" className="font-bold">
          Hasil
        </label>
        <input
          required
          type="number"
          disabled={true}
          id="hasil"
          className="text-center border-b-2 border-b-yellow-200 border-b-solid font-bold bg-none px-2 rounded-md outline-none selection:bg-yellow-200"
        />
      </form>
    </TemplatePr>
  );

  const pr3 = () => (
    <TemplatePr
      title={"Program Hitung Nilai"}
      color={{ a1: "bg-green-50", a2: "bg-green-300 text-green-800" }}
    >
      <form className="grid grid-cols-2 gap-2">
        <label htmlFor="tatapMuka">Tatap Muka</label>
        <input
          required
          type="number"
          id="tatapMuka"
          className="bg-green-100 p-1 px-2 rounded-md outline-none selection:bg-green-200"
        />
        <label htmlFor="midTest">Mid Test</label>
        <input
          required
          type="number"
          id="midTest"
          className="bg-green-100 p-1 px-2 rounded-md outline-none selection:bg-green-200"
        />
        <label htmlFor="finalTest">Final Test</label>
        <input
          required
          type="number"
          id="finalTest"
          className="bg-green-100 p-1 px-2 rounded-md outline-none selection:bg-green-200"
        />
        <span></span>
        <button
          className="py-1 rounded-md hover:bg-green-400 transition-all font-bold bg-green-300 text-green-800"
          onClick={(e) => {
            e.preventDefault();
            let data = [
              $("#tatapMuka").value,
              $("#midTest").value,
              $("#finalTest").value,
            ];
            if (data.every((el) => el === "")) return;

            $("#hasilAkhir").value = Math.round(
              data.reduce((acc, curr) => acc + parseInt(curr), 0) / data.length
            );
          }}
        >
          Hitung
        </button>
        <label htmlFor="hasilAkhir" className="font-bold">
          Hasil Akhir
        </label>
        <input
          required
          type="number"
          disabled={true}
          id="hasilAkhir"
          className="text-center border-b-2 border-b-green-200 border-b-solid font-bold bg-none px-2 rounded-md outline-none selection:bg-green-200"
        />
      </form>
    </TemplatePr>
  );

  const pr4 = () => (
    <TemplatePr
      title={"Program Belanja Sederhana"}
      color={{ a1: "bg-sky-50", a2: "bg-sky-300 text-sky-800" }}
    >
      <form className="grid grid-cols-2 gap-2">
        <label htmlFor="namaBarang">Nama Barang</label>
        <input
          required
          type="text"
          id="namaBarang"
          className="bg-sky-100 p-1 px-2 rounded-md outline-none selection:bg-sky-200"
        />

        <label htmlFor="hargaSatuan">Harga Satuan</label>
        <input
          required
          type="number"
          id="hargaSatuan"
          className="bg-sky-100 p-1 px-2 rounded-md outline-none selection:bg-sky-200"
        />

        <label htmlFor="jumlahBarang">Jumlah Barang</label>
        <input
          required
          type="number"
          id="jumlahBarang"
          className="bg-sky-100 p-1 px-2 rounded-md outline-none selection:bg-sky-200"
        />
        <span></span>
        <div className="grid grid-cols-2 gap-2">
          <button
            className="py-1 rounded-md hover:bg-sky-400 transition-all font-bold bg-sky-300 text-sky-800"
            onClick={(e) => {
              e.preventDefault();
              let barang = [
                $("#namaBarang").value,
                $("#hargaSatuan").value,
                $("#jumlahBarang").value,
              ];
              if (barang.every((el) => el === "")) return;

              let totalHarga = parseInt(barang[1]) * parseInt(barang[2]);
              $("#totalHarga").value = totalHarga;

              const list = [
                { patokan: 500000, diskon: 0.2, bonus: "Tas Pinggang" },
                { patokan: 200000, diskon: 0.15, bonus: "Payung" },
                { patokan: 100000, diskon: 0.1, bonus: "Kaos" },
                { patokan: 50000, diskon: 0.05, bonus: "Cangkir" },
                { patokan: 0, diskon: 0.0, bonus: "Tidak ada" },
              ];

              list.forEach((obj, id, arr) => {
                let batasBawah = obj.patokan;
                let batasAtas = arr[id - 1]?.patokan || totalHarga + 1;

                if (totalHarga >= batasBawah && totalHarga < batasAtas) {
                  let diskonHarga = obj.diskon * totalHarga;
                  $("#diskon").value = `${diskonHarga} (${obj.diskon * 100}%)`;
                  $("#totalBayar").value = totalHarga - diskonHarga;
                  $("#bonus").value = obj.bonus;
                }
              });
            }}
          >
            Hitung
          </button>
          <input
            type="reset"
            value="Ulang"
            className="cursor-pointer py-1 rounded-md hover:bg-sky-400 transition-all font-bold bg-sky-300 text-sky-800"
          />
        </div>
        <label htmlFor="totalHarga" className="font-bold">
          Total Harga
        </label>
        <input
          required
          type="number"
          id="totalHarga"
          disabled={true}
          className="text-center border-b-2 border-b-sky-200 border-b-solid font-bold bg-none px-2 rounded-md outline-none selection:bg-sky-200"
        />
        <label htmlFor="diskon" className="font-bold">
          Diskon
        </label>
        <input
          required
          type="text"
          id="diskon"
          disabled={true}
          className="text-center border-b-2 border-b-sky-200 border-b-solid font-bold bg-none px-2 rounded-md outline-none selection:bg-sky-200"
        />

        <label htmlFor="totalBayar" className="font-bold">
          Total Bayar
        </label>
        <input
          required
          type="number"
          id="totalBayar"
          disabled={true}
          className="text-center border-b-2 border-b-sky-200 border-b-solid font-bold bg-none px-2 rounded-md outline-none selection:bg-sky-200"
        />

        <label htmlFor="bonus" className="font-bold">
          Bonus
        </label>
        <input
          required
          type="text"
          id="bonus"
          disabled={true}
          className="text-center border-b-2 border-b-sky-200 border-b-solid font-bold bg-none px-2 rounded-md outline-none selection:bg-sky-200"
        />

        <span></span>
        <button
          className="py-1 rounded-md hover:bg-sky-400 transition-all font-bold bg-sky-300 text-sky-800"
          onClick={(e) => setDisplay(0)}
        >
          Keluar
        </button>
      </form>
    </TemplatePr>
  );

  const pr5 = () => {
    let menu = {
      nu: 3500,
      b: 6000,
      ma: 7000,
      ej: 3000,
      ja: 7000,
      tm: 4000,
    };

    let makanan = menu.nu,
      minuman = 0;
    const changeMakanan = (m) => {
      makanan = m;
      $("#hargaMakanan").innerText = `Rp. ${m}`;
    };

    const changeMinuman = (m) => {
      minuman = m;
      $("#hargaMinuman").innerText = `Rp. ${m}`;
    };

    return (
      <TemplatePr
        title={"Program Order Makanan"}
        color={{ a1: "bg-fuchsia-50", a2: "bg-fuchsia-300 text-fuchsia-800" }}
      >
        <form className="grid grid-cols-3 gap-2">
          <select
            id="namaMakanan"
            className="bg-fuchsia-100 p-1 px-2 rounded-md outline-none selection:bg-fuchsia-200"
            onChange={(e) => changeMakanan(menu[e.target.value])}
          >
            <option value="nu">Nasi Uduk</option>
            <option value="b">Bakso</option>
            <option value="ma">Mie Ayam</option>
          </select>
          <p className="text-center font-bold">Harga</p>
          <p id="hargaMakanan" className="text-center font-bold">
            Rp. 3500
          </p>
          <span className="text-left col-span-3 mb-2 flex items-center">
            <input
              type="checkbox"
              id="denganMinuman"
              className="w-5 h-5 mr-2 border-0"
              onChange={(e) => {
                $("#namaMinuman").disabled = !e.target.checked;
                $("#porsiMinum").disabled = !e.target.checked;
                minuman = menu[$("#namaMinuman").value];
              }}
            />
            <p>Termasuk dengan minuman</p>
          </span>
          <select
            id="namaMinuman"
            disabled={true}
            className="bg-fuchsia-100 p-1 px-2 rounded-md outline-none selection:bg-fuchsia-200"
            onChange={(e) => changeMinuman(menu[e.target.value])}
          >
            <option value="ej">Es Jeruk</option>
            <option value="ja">Jus Alpukat</option>
            <option value="tm">Teh Manis</option>
          </select>
          <p className="text-center font-bold">Harga</p>
          <p id="hargaMinuman" className="text-center font-bold">
            Rp. 3000
          </p>
        </form>
        <fieldset className="mt-3 border border-solid border-fuchsia-300 p-3 rounded-md">
          <legend className="px-2 font-bold">Menu Pesanan</legend>
          <form className="grid grid-cols-2 gap-2">
            <label htmlFor="porsiMakan">Berapa porsi makanan</label>
            <input
              required
              type="number"
              id="porsiMakan"
              defaultValue={1}
              className="bg-fuchsia-100 p-1 px-2 rounded-md outline-none selection:bg-fuchsia-200"
            />
            <label htmlFor="porsiminum">Berapa porsi minuman</label>
            <input
              required
              type="number"
              disabled={true}
              id="porsiMinum"
              defaultValue={1}
              className="bg-fuchsia-100 p-1 px-2 rounded-md outline-none selection:bg-fuchsia-200"
            />
            <button
              className="py-1 rounded-md hover:bg-fuchsia-400 transition-all font-bold bg-fuchsia-300 text-fuchsia-800"
              onClick={(e) => {
                e.preventDefault();
                let porsiMakan = $("#porsiMakan").value;
                let porsiMinum = $("#porsiMinum").value;

                if (porsiMakan < 1 || porsiMinum < 1) return;
                $("#hasilAkhir").innerText = `Rp. ${
                  makanan * parseInt(porsiMakan) +
                  minuman * parseInt(porsiMinum)
                }`;
              }}
            >
              Hitung
            </button>
            <p
              id="hasilAkhir"
              className="text-center border-b-2 border-b-fuchsia-200 border-b-solid font-bold bg-none px-2 rounded-md outline-none selection:bg-fuchsia-200"
            ></p>
          </form>
        </fieldset>
      </TemplatePr>
    );
  };

  const pr6 = () => {
    return (
      <TemplatePr
        title={"Program Perulangan Teks"}
        color={{ a1: "bg-indigo-50", a2: "bg-indigo-300 text-indigo-800" }}
      >
        <form className="grid grid-cols-2 gap-2">
          <label htmlFor="teks">Tuliskan teks</label>
          <input
            required
            type="text"
            id="teks"
            className="bg-indigo-100 p-1 px-2 rounded-md outline-none selection:bg-indigo-200"
          />

          <label htmlFor="jumlahPengulangan">Jumlah Pengulangan</label>
          <input
            required
            type="number"
            id="jumlahPengulangan"
            className="bg-indigo-100 p-1 px-2 rounded-md outline-none selection:bg-indigo-200"
          />

          <div className="grid col-span-2 grid-cols-3 gap-2">
            <span></span>
            <button
              className="py-1 rounded-md hover:bg-indigo-400 transition-all font-bold bg-indigo-300 text-indigo-800"
              onClick={(e) => {
                e.preventDefault();
                let props = [$("#teks").value, $("#jumlahPengulangan").value];
                if (props.every((el) => el === "")) return;
                if (isNaN(props[1]) || props[1] < 1) return;

                let teks = "";
                for (let i = 0; i < props[1]; i++) {
                  teks += `${props[0]}\n`;
                }

                $("#perulangan").value = teks;
              }}
            >
              Proses
            </button>
            <span></span>
          </div>
          <textarea
            id="perulangan"
            className="col-span-2 overflow-y-scroll resize-none h-[150px]"
          ></textarea>
          <button
            className="py-1 rounded-md hover:bg-indigo-400 transition-all font-bold bg-indigo-300 text-indigo-800"
            onClick={(e) => {
              e.preventDefault();
              $("#teks").value = "";
              $("#jumlahPengulangan").value = "";
              $("#perulangan").value = "";
            }}
          >
            Clear
          </button>
          <button
            className="py-1 rounded-md hover:bg-indigo-400 transition-all font-bold bg-indigo-300 text-indigo-800"
            onClick={(e) => setDisplay(0)}
          >
            Keluar
          </button>
        </form>
      </TemplatePr>
    );
  };

  const pr7 = () => {
    return (
      <TemplatePr
        title={"Program Pendataan Mahasiswa"}
        color={{ a1: "bg-orange-50", a2: "bg-orange-300 text-orange-800" }}
      >
        <form className="grid grid-cols-2 gap-2">
          <label htmlFor="txtnim">NIM</label>
          <input
            required
            className="bg-orange-100 p-1 px-2 rounded-md outline-none selection:bg-orange-200"
            type="text"
            id="txtnim"
          />
          <label htmlFor="txtnama">Nama</label>
          <input
            required
            className="bg-orange-100 p-1 px-2 rounded-md outline-none selection:bg-orange-200"
            type="text"
            id="txtnama"
          />
          <label htmlFor="txtalamat">Alamat</label>
          <input
            required
            className="bg-orange-100 p-1 px-2 rounded-md outline-none selection:bg-orange-200"
            type="text"
            id="txtalamat"
          />
          <label htmlFor="txthp">No. HP</label>
          <input
            required
            className="bg-orange-100 p-1 px-2 rounded-md outline-none selection:bg-orange-200"
            type="text"
            id="txthp"
          />
          <label htmlFor="txtemail">Email</label>
          <input
            required
            className="bg-orange-100 p-1 px-2 rounded-md outline-none selection:bg-orange-200"
            type="email"
            id="txtemail"
          />
        </form>
        <button
          className="bg-orange-500 text-white col-auto w-full py-2 mt-3 font-bold rounded-md hover:bg-orange-600"
          onClick={async (e) => {
            e.preventDefault();
            let form1 = [
              $("#txtnama").value,
              $("#txtnim").value,
              $("#txtalamat").value,
              $("#txthp").value,
              $("#txtemail").value,
            ];

            if (form1.every((el) => el !== "")) {
              setModal(true);

              try {
                const docRef = doc(db, "mhs", $("#txtnim").value);
                await setDoc(docRef, {
                  nama: $("#txtnama").value,
                  nim: $("#txtnim").value,
                  alamat: $("#txtalamat").value,
                  hp: $("#txthp").value,
                  email: $("#txtemail").value,
                  dateCreated: serverTimestamp(),
                  dateUpdated: serverTimestamp(),
                });

                setModalcontent({
                  title: "Berhasil",
                  content: `Berhasil menyimpan ke database`,
                });
              } catch (err) {
                setModalcontent({
                  title: "Gagal menyimpan ke database",
                  content: "Terjadi kesalahan " + err.message,
                });
              }
            }
          }}
        >
          Simpan ke Database
        </button>
      </TemplatePr>
    );
  };

  const pr8 = () => {
    return (
      <TemplatePr
        title={"Coming soon"}
        color={{ a1: "bg-lime-50", a2: "bg-lime-300 text-lime-800" }}
      >
        <h1>Just wait for it</h1>
      </TemplatePr>
    );
  };

  const renderList = {
    0: initialRender,
    1: pr1,
    2: pr2,
    3: pr3,
    4: pr4,
    5: pr5,
    6: pr6,
    7: pr7,
    8: pr8,
  };

  return (
    <div className="container mx-auto p-5">
      <div className="text-center mb-5 flex">
        <h1 className=" font-bold text-3xl py-1 px-3 rounded-md -rotate-6 bg-red-600 text-white">
          .NET
        </h1>
        <h1 className="font-bold text-4xl ml-1">
          {" "}
          Programming{" "}
          <span className="text-sm font-normal italic text-red-500">
            (but using Tauri+React+Tailwind)
          </span>
        </h1>
      </div>
      {renderList[display]()}
      <div className="mt-5">
        <p>
          Built with joy by{" "}
          <a
            href="https://snowfluke.github.io/index.html"
            className="font-bold underline"
          >
            Awal Ariansyah
          </a>
        </p>
      </div>
      {modal && openModal(modalcontent)}
    </div>
  );
}

function popUp(title, content, close) {
  return (
    <div id="myModal" className="fixed top-0 left-0 right-0 w-full h-full">
      <div className="container mx-auto mt-5">
        <div className="border-[1px] border-gray-200 p-3 shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
          <div className="flex border-b-2 border-b-gray-100">
            <h2 className="flex-1 text-xl font-bold">{title}</h2>
            <span
              className="text-xl py-1 px-3 hover:bg-red-300 cursor-pointer bg-red-100 rounded-full"
              onClick={() => close()}
            >
              &times;
            </span>
          </div>
          <div className="container mx-auto text-center py-2">
            {content &&
              content.split("\n").map((el, id) => <p key={id}>{el}</p>)}
          </div>
          <div className="flex justify-center">
            <button
              className="w-[50%] bg-red-100 py-2 hover:bg-red-300 rounded-md"
              onClick={() => close()}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
