import { useState, useEffect } from "react";
import { db } from "./db";
import {
  doc,
  setDoc,
  collection,
  deleteDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
const $ = (el) => document.querySelector(el);

function App() {
  const [display, setDisplay] = useState(0);
  const [data, setData] = useState([]);
  const [bookData, setBookData] = useState([]);
  const [printData, setPrintData] = useState([]);

  const fetchData = async () => {
    try {
      const docs = (await getDocs(collection(db, "book"))).docs.map((doc) =>
        doc.data()
      );

      return docs;
    } catch (error) {
      return [];
    }
  };

  const fetchBookData = async () => {
    try {
      const docs = (await getDocs(collection(db, "bookshelf"))).docs.map(
        (doc) => doc.data()
      );

      return docs;
    } catch (error) {
      return [];
    }
  };

  useEffect(() => {
    fetchData().then((res) => setData(res));
    fetchBookData().then((res) => setBookData(res));
  }, []);

  const filter = async (keyword) => {
    let freshData = await fetchData();

    if (keyword !== "" && freshData.length) {
      let filteredData = freshData.filter((el) =>
        el.kdJenis.toLowerCase().includes(keyword)
      );

      if (!filteredData.length) {
        filteredData = freshData.filter((el) =>
          el.nmJenis.toLowerCase().includes(keyword)
        );
      }

      let first = filteredData.length
        ? filteredData[0]
        : { kdJenis: "", nmJenis: "" };

      setData(filteredData);

      return first;
    } else {
      setData(freshData);

      return { kdJenis: "", nmJenis: "" };
    }
  };

  const filterBook = async (keyword) => {
    let freshData = await fetchBookData();

    if (keyword !== "" && freshData.length) {
      let filteredData = freshData.filter((el) =>
        el.kodeBuku.toLowerCase().includes(keyword)
      );

      if (!filteredData.length) {
        filteredData = freshData.filter((el) =>
          el.judul.toLowerCase().includes(keyword)
        );
      }

      if (!filteredData.length) {
        filteredData = freshData.filter((el) =>
          el.pengarang.toLowerCase().includes(keyword)
        );
      }

      if (!filteredData.length) {
        filteredData = freshData.filter((el) =>
          el.penerbit.toLowerCase().includes(keyword)
        );
      }

      let first = filteredData.length
        ? filteredData[0]
        : {
            deskripsi: "",
            harga: "",
            judul: "",
            jumlahBuku: "",
            kodeBuku: "",
            kodeJenis: "",
            penerbit: "",
            pengarang: "",
          };

      setBookData(filteredData);

      return first;
    } else {
      setBookData(freshData);

      return {
        deskripsi: "",
        harga: "",
        judul: "",
        jumlahBuku: "",
        kodeBuku: "",
        kodeJenis: "",
        penerbit: "",
        pengarang: "",
      };
    }
  };

  const praktikum = [
    { content: "Data jenis buku", color: "border-l-red-400 hover:bg-red-200" },
    { content: "Data buku", color: "border-l-red-400 hover:bg-red-200" },
    {
      content: "Laporan data",
      color: "border-l-red-400 hover:bg-red-200",
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
        <div className="flex mb-3  print:hidden">
          <h2 className="flex-1 font-bold text-xl">{title}</h2>
          <button
            className={
              "px-2 py-1 rounded-md hover:-translate-x-1 transition-all font-bold  print:hidden" +
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

  const Pr1 = () => {
    return (
      <TemplatePr
        title={"Data jenis buku"}
        color={{ a1: "bg-red-50", a2: "bg-red-300 text-red-800" }}
      >
        <form className="grid grid-cols-2 gap-2">
          <label htmlFor="kdjenis">Kode Jenis</label>
          <input
            required
            className="bg-red-100 p-1 px-2 rounded-md outline-none selection:bg-red-200"
            type="text"
            id="TextBox1"
          />
          <label htmlFor="nmjenis">Nama Jenis</label>
          <input
            required
            className="bg-red-100 p-1 px-2 rounded-md outline-none selection:bg-red-200"
            type="text"
            id="TextBox2"
          />
        </form>
        <div className="grid grid-cols-4 gap-2">
          <button
            id="Simpan"
            className="bg-red-500 text-white col-auto w-full py-2 mt-3 font-bold rounded-md hover:bg-red-600"
            onClick={async (e) => {
              try {
                e.preventDefault();
                let kdJenis = $("#TextBox1").value;
                if (!kdJenis) return alert("Kode jenis tidak boleh kosong!");

                let nmJenis = $("#TextBox2").value;

                const docRef = doc(db, `book`, kdJenis);
                await setDoc(docRef, { kdJenis, nmJenis });
                alert("Berhasil menyimpan jenis buku");
                await filter("");
              } catch (error) {
                alert(error.message);
              }
            }}
          >
            Simpan
          </button>
          <button
            id="Ubah"
            className="bg-red-500 text-white col-auto w-full py-2 mt-3 font-bold rounded-md hover:bg-red-600"
            onClick={async (e) => {
              try {
                e.preventDefault();
                let kdJenis = $("#TextBox1").value;
                if (!kdJenis) return alert("Kode jenis tidak boleh kosong!");

                let nmJenis = $("#TextBox2").value;

                const docRef = doc(db, `book`, kdJenis);
                await updateDoc(docRef, { kdJenis, nmJenis });
                alert("Berhasil mengupdate jenis buku");
                await filter("");
              } catch (error) {
                alert(error.message);
              }
            }}
          >
            Ubah
          </button>
          <button
            id="Hapus"
            className="bg-red-500 text-white col-auto w-full py-2 mt-3 font-bold rounded-md hover:bg-red-600"
            onClick={async (e) => {
              try {
                e.preventDefault();
                let kdJenis = $("#TextBox1").value;
                if (!kdJenis) return alert("Kode jenis tidak boleh kosong!");

                const docRef = doc(db, `book`, kdJenis);
                await deleteDoc(docRef);
                alert("Berhasil menghapus jenis buku");
                await filter("");
              } catch (error) {
                alert(error.message);
              }
            }}
          >
            Hapus
          </button>
          <button
            id="Batal"
            className="bg-red-500 text-white col-auto w-full py-2 mt-3 font-bold rounded-md hover:bg-red-600"
            onClick={(e) => {
              e.preventDefault();
              $("#TextBox1").value = "";
              $("#TextBox2").value = "";
            }}
          >
            Batal
          </button>
        </div>
        <form className="grid mt-2  grid-cols-2 gap-2">
          <input
            required
            type="text"
            id="TextBox3"
            placeholder="Cari data disini ..."
            className="font-bold outline-none selection:bg-red-200 bg-red-100 p-1 px-2 rounded-md"
          />
          <button
            id="Cari"
            className="bg-red-500 text-white col-auto w-full py-2 font-bold rounded-md hover:bg-red-600"
            onClick={async (e) => {
              e.preventDefault();
              $("#TextBox1").value = "";
              $("#TextBox2").value = "";

              let keyword = $("#TextBox3").value;
              const res = await filter(keyword);
              if (res.kdJenis && keyword !== "") {
                $("#TextBox1").value = res.kdJenis;
                $("#TextBox2").value = res.nmJenis;
              }
            }}
          >
            Cari
          </button>
        </form>
        <div
          id="DataGridView1"
          className="flex bg-white w-full col-span-2 outline-none mt-2 overflow-y-scroll resize-none h-[150px]"
        >
          <table className=" table-auto">
            <thead>
              <tr>
                <th className=" border-2 border-black p-2">No</th>
                <th className=" border-2 border-black p-2">Kode Jenis</th>
                <th className=" border-2 border-black p-2">Nama Jenis</th>
              </tr>
            </thead>
            {
              <tbody>
                {!data.length ? (
                  <tr>
                    <td colSpan={3}>Tidak ada data</td>
                  </tr>
                ) : (
                  data.map((el, id) => (
                    <tr key={id}>
                      <td className=" border-2 border-black p-2">{id + 1}</td>
                      <td className=" border-2 border-black p-2">
                        {el.kdJenis}
                      </td>
                      <td className=" border-2 border-black p-2">
                        {el.nmJenis}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            }
          </table>
        </div>
      </TemplatePr>
    );
  };

  const Pr2 = () => {
    return (
      <TemplatePr
        title={"Data buku"}
        color={{ a1: "bg-red-50", a2: "bg-red-300 text-red-800" }}
      >
        <div className="grid grid-cols-1 gap-2 ">
          <div className="grid grid-cols-6 gap-2 items-center">
            <label htmlFor="kdjenis">Kode Buku</label>
            <input
              required
              className="bg-red-100 p-1 px-2 rounded-md outline-none selection:bg-red-200"
              type="text"
              id="TextBox1"
            />
            <label htmlFor="nmjenis">Jenis Buku</label>
            <select
              className="bg-red-100 p-1 px-2 rounded-md outline-none selection:bg-red-200"
              defaultValue={0}
              onChange={(e) => {
                $("#TextBox8").value = data.filter(
                  (el) => el.kdJenis === e.target.value
                )[0]?.nmJenis;
              }}
              required
              id="ComboBox1"
            >
              <option value={0} disabled className="hidden"></option>
              {data?.map((el, id) => (
                <option key={id} value={el.kdJenis}>
                  {el.kdJenis}
                </option>
              ))}
            </select>
            <input
              disabled={true}
              className="col-span-2 bg-red-200 p-1 px-2 rounded-md outline-none selection:bg-red-300"
              type="text"
              id="TextBox8"
            />
          </div>
          <div className="grid grid-cols-6 gap-2 items-center">
            <label htmlFor="judul" className="grid">
              Judul
            </label>
            <input
              required
              className="grid col-span-5 bg-red-100 p-1 px-2 rounded-md outline-none selection:bg-red-200"
              type="text"
              id="TextBox2"
            />
          </div>
          <div className="grid grid-cols-6 gap-2 items-center">
            <label htmlFor="pengarang" className="grid">
              Pengarang
            </label>
            <input
              required
              className="grid col-span-3 bg-red-100 p-1 px-2 rounded-md outline-none selection:bg-red-200"
              type="text"
              id="TextBox3"
            />
            <p>Deskripsi</p>
          </div>

          <div className="grid grid-cols-6 gap-2 items-center">
            <label htmlFor="penerbit" className="grid">
              Penerbit
            </label>
            <input
              required
              className="grid col-span-3 bg-red-100 p-1 px-2 rounded-md outline-none selection:bg-red-200"
              type="text"
              id="TextBox4"
            />
            <input
              required
              className="grid col-span-2 h-full row-span-2 bg-red-100 p-1 px-2 rounded-md outline-none selection:bg-red-200"
              type="text"
              id="TextBox7"
            />
            <label htmlFor="JumlahBuku" className="grid">
              Jumlah Buku
            </label>
            <input
              required
              className="grid bg-red-100 p-1 px-2 rounded-md outline-none selection:bg-red-200"
              type="text"
              id="TextBox5"
            />
            <label htmlFor="Harga" className="grid">
              Harga (Rp. K)
            </label>
            <input
              required
              className="grid bg-red-100 p-1 px-2 rounded-md outline-none selection:bg-red-200"
              type="text"
              id="TextBox6"
            />
          </div>

          <div className="grid grid-cols-5 gap-2 items-center">
            <button
              id="Simpan"
              className="bg-red-500 text-white col-auto w-full py-2 mt-3 font-bold rounded-md hover:bg-red-600"
              onClick={async (e) => {
                try {
                  e.preventDefault();
                  let kodeBuku = $("#TextBox1").value;
                  if (!kodeBuku) return alert("Kode Buku tidak boleh kosong!");

                  let judul = $("#TextBox2").value;
                  let pengarang = $("#TextBox3").value;
                  let penerbit = $("#TextBox4").value;
                  let jumlahBuku = $("#TextBox5").value;
                  let harga = $("#TextBox6").value;
                  let deskripsi = $("#TextBox7").value;
                  let kodeJenis = $("#ComboBox1").value;

                  const docRef = doc(db, `bookshelf`, kodeBuku);
                  await setDoc(docRef, {
                    kodeBuku,
                    judul,
                    pengarang,
                    penerbit,
                    jumlahBuku,
                    harga,
                    deskripsi,
                    kodeJenis,
                  });
                  alert("Berhasil menyimpan buku");
                  await filterBook("");
                } catch (error) {
                  alert(error.message);
                }
              }}
            >
              Simpan
            </button>
            <button
              id="Ubah"
              className="bg-red-500 text-white col-auto w-full py-2 mt-3 font-bold rounded-md hover:bg-red-600"
              onClick={async (e) => {
                try {
                  e.preventDefault();
                  let kodeBuku = $("#TextBox1").value;
                  if (!kodeBuku) return alert("Kode Buku tidak boleh kosong!");

                  let judul = $("#TextBox2").value;
                  let pengarang = $("#TextBox3").value;
                  let penerbit = $("#TextBox4").value;
                  let jumlahBuku = $("#TextBox5").value;
                  let harga = $("#TextBox6").value;
                  let deskripsi = $("#TextBox7").value;
                  let kodeJenis = $("#ComboBox1").value;

                  const docRef = doc(db, `bookshelf`, kodeBuku);
                  await updateDoc(docRef, {
                    kodeBuku,
                    judul,
                    pengarang,
                    penerbit,
                    jumlahBuku,
                    harga,
                    deskripsi,
                    kodeJenis,
                  });
                  alert("Berhasil mengupdate buku");
                  await filterBook("");
                } catch (error) {
                  alert(error.message);
                }
              }}
            >
              Ubah
            </button>
            <button
              id="Hapus"
              className="bg-red-500 text-white col-auto w-full py-2 mt-3 font-bold rounded-md hover:bg-red-600"
              onClick={async (e) => {
                try {
                  e.preventDefault();
                  let kodeBuku = $("#TextBox1").value;
                  if (!kodeBuku) return alert("Kode Buku tidak boleh kosong!");

                  const docRef = doc(db, `bookshelf`, kodeBuku);
                  await deleteDoc(docRef);
                  alert("Berhasil menghapus buku");
                  await filterBook("");
                } catch (error) {
                  alert(error.message);
                }
              }}
            >
              Hapus
            </button>
            <button
              id="Batal"
              className="bg-red-500 text-white col-auto w-full py-2 mt-3 font-bold rounded-md hover:bg-red-600"
              onClick={(e) => {
                e.preventDefault();
                $("#TextBox1").value = "";
                $("#TextBox2").value = "";
                $("#TextBox3").value = "";
                $("#TextBox4").value = "";
                $("#TextBox5").value = "";
                $("#TextBox6").value = "";
                $("#TextBox7").value = "";
                $("#TextBox8").value = "";
                $("#ComboBox1").value = 0;
              }}
            >
              Batal
            </button>
            <button
              id="Tutup"
              className="bg-red-500 text-white col-auto w-full py-2 mt-3 font-bold rounded-md hover:bg-red-600"
              onClick={() => setDisplay(0)}
            >
              Tutup
            </button>
          </div>
          <div className="grid my-2 grid-cols-6 gap-2">
            <input
              required
              type="text"
              id="TextBox9"
              placeholder="Cari data disini ..."
              className="font-bold outline-none col-span-5 selection:bg-red-200 bg-red-100 p-1 px-2 rounded-md"
            />
            <button
              id="Cari"
              className="bg-red-500 text-white py-2 font-bold rounded-md hover:bg-red-600"
              onClick={async (e) => {
                e.preventDefault();
                $("#TextBox1").value = "";
                $("#TextBox2").value = "";
                $("#TextBox3").value = "";
                $("#TextBox4").value = "";
                $("#TextBox5").value = "";
                $("#TextBox6").value = "";
                $("#TextBox7").value = "";
                $("#TextBox8").value = "";
                $("#ComboBox1").value = 0;

                let keyword = $("#TextBox9").value;
                const res = await filterBook(keyword);
                if (res.kodeBuku && keyword !== "") {
                  $("#TextBox1").value = res.kodeBuku;
                  $("#TextBox2").value = res.judul;
                  $("#TextBox3").value = res.pengarang;
                  $("#TextBox4").value = res.penerbit;
                  $("#TextBox5").value = res.jumlahBuku;
                  $("#TextBox6").value = res.harga;
                  $("#TextBox7").value = res.deskripsi;
                  $("#TextBox8").value = data.filter(
                    (el) => el.kdJenis === res.kodeJenis
                  )[0]?.nmJenis;
                  $("#ComboBox1").value = res.kodeJenis;
                }
              }}
            >
              Cari
            </button>
          </div>
        </div>
        <div
          id="DataGridView1"
          className="flex bg-white w-full col-span-2 outline-none mt-2 overflow-y-scroll resize-none h-[150px]"
        >
          <table className=" table-auto">
            <thead>
              <tr>
                <th className=" border-2 border-black p-2">No</th>
                <th className=" border-2 border-black p-2">Kode</th>
                <th className=" border-2 border-black p-2">Judul</th>
                <th className=" border-2 border-black p-2">Pengarang</th>
                <th className=" border-2 border-black p-2">Penerbit</th>
                <th className=" border-2 border-black p-2">Jenis</th>
                <th className=" border-2 border-black p-2">Jumlah</th>
                <th className=" border-2 border-black p-2">Harga</th>
                <th className=" border-2 border-black p-2">Deskripsi</th>
              </tr>
            </thead>
            {
              <tbody>
                {!bookData.length ? (
                  <tr>
                    <td colSpan={3}>Tidak ada buku</td>
                  </tr>
                ) : (
                  bookData.map((el, id) => (
                    <tr key={id}>
                      <td className=" border-2 border-black p-2">{id + 1}</td>
                      <td className=" border-2 border-black p-2">
                        {el.kodeBuku}
                      </td>
                      <td className=" border-2 border-black p-2">{el.judul}</td>
                      <td className=" border-2 border-black p-2">
                        {el.pengarang}
                      </td>
                      <td className=" border-2 border-black p-2">
                        {el.penerbit}
                      </td>
                      <td className=" border-2 border-black p-2">
                        {
                          data?.filter((er) => er.kdJenis === el.kodeJenis)[0]
                            ?.nmJenis
                        }
                      </td>
                      <td className=" border-2 border-black p-2">
                        {el.jumlahBuku}
                      </td>
                      <td className=" border-2 border-black p-2">{el.harga}</td>
                      <td className=" border-2 border-black p-2">
                        {el.deskripsi}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            }
          </table>
        </div>
      </TemplatePr>
    );
  };

  const Pr3 = () => {
    return (
      <TemplatePr
        title={"Laporan Data"}
        color={{ a1: "bg-red-50", a2: "bg-red-300 text-red-800" }}
      >
        <div className="grid grid-cols-1 gap-2 ">
          <div className="grid my-2 grid-cols-6 gap-2  print:hidden">
            <select
              className="bg-red-100 p-1 col-span-4 px-2 rounded-md outline-none selection:bg-red-200"
              defaultValue={0}
              required
              id="ComboBox1"
            >
              <option value={0} disabled>
                Pilih Jenis Data
              </option>
              <option value={"jenisBuku"}>Data Jenis Buku</option>
              <option value={"dataBuku"}>Data Buku</option>
            </select>
            <button
              id="Tampilkan"
              className="bg-red-500 text-white py-2 font-bold rounded-md hover:bg-red-600"
              onClick={async (e) => {
                e.preventDefault();
                let val = $("#ComboBox1").value;
                if (!val) return;

                let d;
                if (val === "jenisBuku") {
                  d = await fetchData();
                  setPrintData(d);
                  return;
                }

                d = await fetchBookData();
                setPrintData(d);
                return;
              }}
            >
              Tampilkan
            </button>
            <button
              id="Tampilkan"
              className="bg-red-500 text-white py-2 font-bold rounded-md hover:bg-red-600"
              onClick={async (e) => {
                e.preventDefault();
                window.print();
              }}
            >
              Cetak
            </button>
          </div>
        </div>
        <div
          id="DataGridView1"
          className="flex bg-white w-full col-span-2 outline-none mt-2 overflow-y-scroll resize-none h-[150px]"
        >
          <table className=" table-auto">
            <thead>
              <tr>
                {!printData.length ? (
                  <></>
                ) : $("#ComboBox1").value === "jenisBuku" ? (
                  <>
                    <th className=" border-2 border-black p-2">No</th>
                    <th className=" border-2 border-black p-2">Kode Jenis</th>
                    <th className=" border-2 border-black p-2">Nama Jenis</th>
                  </>
                ) : (
                  <>
                    <th className=" border-2 border-black p-2">No</th>
                    <th className=" border-2 border-black p-2">Kode</th>
                    <th className=" border-2 border-black p-2">Judul</th>
                    <th className=" border-2 border-black p-2">Pengarang</th>
                    <th className=" border-2 border-black p-2">Penerbit</th>
                    <th className=" border-2 border-black p-2">Jenis</th>
                    <th className=" border-2 border-black p-2">Jumlah</th>
                    <th className=" border-2 border-black p-2">Harga</th>
                    <th className=" border-2 border-black p-2">Deskripsi</th>
                  </>
                )}
              </tr>
            </thead>
            {
              <tbody>
                {!printData.length ? (
                  <tr>
                    <td colSpan={3}>Tidak ada data</td>
                  </tr>
                ) : $("#ComboBox1").value === "jenisBuku" ? (
                  printData.map((el, id) => (
                    <tr key={id}>
                      <td className=" border-2 border-black p-2">{id + 1}</td>
                      <td className=" border-2 border-black p-2">
                        {el.kdJenis}
                      </td>
                      <td className=" border-2 border-black p-2">
                        {el.nmJenis}
                      </td>
                    </tr>
                  ))
                ) : (
                  printData.map((el, id) => (
                    <tr key={id}>
                      <td className=" border-2 border-black p-2">{id + 1}</td>
                      <td className=" border-2 border-black p-2">
                        {el.kodeBuku}
                      </td>
                      <td className=" border-2 border-black p-2">{el.judul}</td>
                      <td className=" border-2 border-black p-2">
                        {el.pengarang}
                      </td>
                      <td className=" border-2 border-black p-2">
                        {el.penerbit}
                      </td>
                      <td className=" border-2 border-black p-2">
                        {
                          data?.filter((er) => er.kdJenis === el.kodeJenis)[0]
                            ?.nmJenis
                        }
                      </td>
                      <td className=" border-2 border-black p-2">
                        {el.jumlahBuku}
                      </td>
                      <td className=" border-2 border-black p-2">{el.harga}</td>
                      <td className=" border-2 border-black p-2">
                        {el.deskripsi}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            }
          </table>
        </div>
      </TemplatePr>
    );
  };

  const renderList = {
    0: initialRender,
    1: Pr1,
    2: Pr2,
    3: Pr3,
  };

  return (
    <div className="container mx-auto p-5">
      <div className="text-center mb-5 flex  print:hidden">
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
      <div className="mt-5 print:hidden">
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
    </div>
  );
}

export default App;
