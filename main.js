const form = document.getElementById('form');
const apiToken = 'YOUR_TELEGRAM_API';
const chatId = 'YOUR_CHAT_ID';

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nama = document.getElementById('nama').value;
  const nomor = document.getElementById('nomor').value;
  const pesan = document.getElementById('pesan').value;


  document.getElementById('hasil-pesan').innerHTML = `
      <br>
      <div style="padding: 10px; border: 1px solid #ccc; border-radius: 10px;">
      <h2>Pesan Terakhir</h2>
      <p style="margin-top: -15px;">Data Tidak Di Simpan Permanen</p>
      <hr style="margin-top: -5px">
        <h4>Nama: ${nama}</h4>
        <h4 style="margin-top: -20px">Nomor: ${nomor}</h4>
        <p>Pesan: ${pesan}</p>
        <p>Note: Ingin Mengirim pesan lagi?. silahkan refresh halaman</p>
      </div>
      `

  const url = `https://api.telegram.org/bot${apiToken}/sendMessage`;
  const data = {
    chat_id: chatId,
    text: `Nama: ${nama}\nNomor:  ${nomor}\nPesan: ${pesan}`,
  };

  fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => berhasilKirim(data))
    .catch((error) => gagalKirim(data));

  function berhasilKirim(data) {
    swal.fire({
      title: 'Berhasil Kirim',
      text: 'Berhasil Mengirim pesan',
      icon: 'success'
    })
  }
  
  function gagalKirim(data) {
    swal.fire({
      title: 'Gagal Mengirim',
      text: 'Gagal Mengirim pesan.. Sepertinya kamu tidak tersambung ke internet',
      icon: 'error'
    })
  }


  document.querySelector('#btn-kirim').disabled = true;
});
