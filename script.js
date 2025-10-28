
const firebaseConfig = {
  apiKey: "AIzaSyDlRSY_z3xQ4x1q1WP8VcRUR6CMKiN9fJ8",
  authDomain: "share-shelf-a99ae.firebaseapp.com",
  projectId: "share-shelf-a99ae",
  storageBucket: "share-shelf-a99ae.appspot.com",
  messagingSenderId: "626250161739",
  appId: "1:626250161739:web:2f4b8871b56e9ccba677ce",
  measurementId: "G-892VBTD87Z"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

function toggleAddress() {
  const method = document.getElementById("d_method").value;
  document.getElementById("addressField").style.display = method === "Home Pickup" ? "block" : "none";
  document.getElementById("dropNote").style.display = method === "Drop-off" ? "block" : "none";
}

document.getElementById("donationForm").addEventListener("submit", async (e)=>{
  e.preventDefault();
  await db.collection("donations").add({
    name: d_name.value,
    item: d_item.value,
    category: d_category.value,
    method: d_method.value,
    address: d_address.value
  });
  alert("Thanks for the donation, the people that will have these will be grateful, God bless you");
  donationForm.reset();
});

document.getElementById("volunteerForm").addEventListener("submit", async (e)=>{
  e.preventDefault();
  const file = document.getElementById("v_id").files[0];
  const ref = storage.ref("ids/" + file.name);
  await ref.put(file);
  const url = await ref.getDownloadURL();
  await db.collection("volunteers").add({name: v_name.value, phone: v_phone.value, idURL: url});
  alert("Volunteer Registered Successfully!");
  volunteerForm.reset();
});

db.collection("donations").onSnapshot(snapshot=>{
  const container = document.getElementById("recordsContainer");
  container.innerHTML = "";
  snapshot.forEach(doc=>{
    const d = doc.data();
    container.innerHTML += `<p><strong>${d.name}</strong> donated <strong>${d.item}</strong> (${d.category}) via ${d.method}</p>`;
  });
});
