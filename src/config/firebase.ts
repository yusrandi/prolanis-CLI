import database from '@react-native-firebase/database';
// import firestore from '@react-native-firebase/firestore';

const usersDatabaseRef = database().ref('users');
const resepDatabaseRef = database().ref('reseps');
const jadwalDatabaseRef = database().ref('jadwals');
const tolakUkursDatabaseRef = database().ref('tolak-ukurs');
const forumsDatabaseRef = database().ref('forums');
const messagesDatabaseRef = database().ref('messages');
const notifikasisDatabaseRef = database().ref('notifikasis');
const nutrisiDatabaseRef = database().ref('nutrisis');
const tipsDatabaseRef = database().ref('tips');
const resepNormalDatabaseRef = "resepnormal";
const resepObesitasDatabaseRef = "resepobesitas";
const jadwalNormalDatabaseRef = "jadwalnormal";
const jadwalObesitasDatabaseRef = "jadwalobesitas";

export {usersDatabaseRef, resepNormalDatabaseRef, resepObesitasDatabaseRef, tolakUkursDatabaseRef, jadwalNormalDatabaseRef, jadwalObesitasDatabaseRef, forumsDatabaseRef, messagesDatabaseRef, resepDatabaseRef, jadwalDatabaseRef, notifikasisDatabaseRef, nutrisiDatabaseRef, tipsDatabaseRef}