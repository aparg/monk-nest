const sqlite3 = require("sqlite3").verbose();
const DBPATH = "./pathTracker.db";
const tableName = "pathTracker";
const util = require("util");

export async function POST(request, response) {
  const { pathLink } = request.body;
  const dbPath = path.resolve(__dirname, DBPATH);
  const db = new sqlite3.Database(dbPath);

  await db.run(
    `CREATE TABLE IF NOT EXISTS ${tableName} (
      id INTEGER PRIMARY KEY,
      pathLink TEXT,
      count INT
  )`,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
    }
  );

  const checkIfPathExists = async () => {
    const dbGetAsync = util.promisify(db.get).bind(db);
    try {
      const row = await dbGetAsync(
        `SELECT * FROM ${tableName} WHERE pathLink = ?`,
        pathLink
      );
      if (row) {
        return row;
      } else {
        return false;
      }
    } catch (err) {
      console.error("Error querying database:", err);
      throw err;
    } finally {
      db.close();
    }
  };

  if (checkIfPathExists()) {
    const addCount = async () => {
      try {
        await new Promise((resolve, reject) => {
          db.run(
            `UPDATE ${tableName} WHERE pathLink = ${pathLink}`,
            function (err) {
              if (err) {
                reject(err);
              } else {
                resolve(this);
              }
            }
          );
        });
      } catch (error) {
        console.error("Error:", error);
      } finally {
        db.close();
      }
    };
    addCount();
    response.status(200).json({ message: "New link was added" });
  } else {
    const addLink = async () => {
      try {
        await new Promise((resolve, reject) => {
          db.run(
            `INSERT INTO ${tableName}(pathLink, count) VALUES(${pathLink},1)`,
            function (err) {
              if (err) {
                reject(err);
              } else {
                resolve(this);
              }
            }
          );
        });
      } catch (error) {
        console.error("Error:", error);
      } finally {
        db.close();
      }
    };
    addLink();
    response.status(200).json({ message: "Link count was added" });
  }
}
