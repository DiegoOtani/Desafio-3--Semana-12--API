import  sqlite3 from "sqlite3";
import { open} from "sqlite";

export const openDb = async () => {
  return open({
    filename: './src/database/database.db',
    driver: sqlite3.Database
  });
}

export async function setupDatabase() {
  const db = await openDb();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS Country (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      continent TEXT NOT NULL,
      urlImg TEXT NOT NULL
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS Destinations (
      id TEXT PRIMARY KEY,
      country TEXT NOT NULL,
      city TEXT NOT NULL,
      FOREIGN KEY (country) REFERENCES Country(id)
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS Types (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL
    )  
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS Tours (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      city TEXT NOT NULL,
      initial_date DATE NOT NULL,
      end_date DATE NOT NULL,
      duration INTEGER NOT NULL CHECK (duration >= 1 AND duration <= 7),
      price_per_person INTEGER NOT NULL,
      peoples INTEGER NOT NULL,
      max_people INTEGER NOT NULL,
      min_age INTEGER NOT NULL CHECK (min_age IN (3, 12, 18)),
      overview TEXT NOT NULL,
      location TEXT NOT NULL,
      ulrImg TEXT NOT NULL,
      FOREIGN KEY (city) REFERENCES Destinations(id)
    )  
  `);
  
  await db.exec(`
    CREATE TABLE IF NOT EXISTS TourTypes(
      tour_id TEXT NOT NULL,
      type_id TEXT NOT NULL,
      PRIMARY KEY (tour_id, type_id),
      FOREIGN KEY (tour_id) REFERENCES Tours(id) ON DELETE CASCADE,
      FOREIGN KEY (type_id) REFERENCES Types(id) ON DELETE CASCADE
    )  
  `);
  

  await db.exec(`
    CREATE TABLE IF NOT EXISTS Reviews (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      comment TEXT NOT NULL,
      services INTEGER NOT NULL CHECK (services >= 1 AND services <= 5),
      locations INTEGER NOT NULL CHECK (locations >= 1 AND locations <= 5),
      amenities INTEGER NOT NULL CHECK (amenities >= 1 AND amenities <= 5),
      prices INTEGER NOT NULL CHECK (prices >= 1 AND prices <= 5),
      food INTEGER NOT NULL CHECK (food >= 1 AND food <= 5),
      room_comfort_quality INTEGER NOT NULL CHECK (room_comfort_quality >= 1 AND room_comfort_quality <= 5),
      average REAL NOT NULL CHECK (average >= 1 AND average <= 5),
      date_review DATE NOT NULL,
      user_id TEXT NOT NULL,
      tour_id TEXT NOT NULL,
      FOREIGN KEY (tour_id) REFERENCES Tours(id) ON DELETE CASCADE
    )
  `);
};
