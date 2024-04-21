import { Pool } from "mysql2";

export async function createBotTable(db_pool: Pool) {
    return new Promise((resolve, reject) => {
      db_pool.getConnection((err, conn) => {
        if (err) {
          console.error("Error acquiring connection from pool:", err);
          reject(err);
          return;
        }
      const query = `CREATE TABLE IF NOT EXISTS bot.test_temp_1 (
          id INT NOT NULL AUTO_INCREMENT,
          idsitehsr int,
          status string,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          PRIMARY KEY (id)
        ) 
        ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`;
        conn.query(query, async (err, results) => {
          if (err) {
            console.error("Error executing query:", err);
            conn.release();
            reject(err);
            return;
          }
          resolve(results);
          conn.release();
          console.log("bot.test_temp_1 table recreated if non-existent");
        });
        db_pool.releaseConnection(conn);
      });
    });
}
  
export async function dropBotTable(db_pool: Pool) {
    return new Promise((resolve, reject) => {
    db_pool.getConnection((err, conn) => {
        if (err) {
        console.error("Error acquiring connection from pool:", err);
        reject(err);
        return;
        }
    const query = `DROP TABLE IF EXISTS bot.test_temp_1;`;
        conn.query(query, async (err, results) => {
        if (err) {
            console.error("Error executing query:", err);
            conn.release();
            reject(err);
            return;
        }
        resolve(results);
        conn.release();
        console.log("results: ", results);
        });
        db_pool.releaseConnection(conn);
    });
    });
}

export async function fetchInsertBotTable(db_pool: Pool) {
    return new Promise((resolve, reject) => {
      db_pool.getConnection((err, conn) => {
        if (err) {
          console.error("Error acquiring connection from pool:", err);
          reject(err);
          return;
        }
        const query = `
          INSERT INTO bot.test_temp_1 (idsitehsr, status)
          SELECT idsitehsr, 'TODO'
          FROM matomo_site_hsr
          WHERE idsite NOT IN (SELECT idsite FROM bot.test_temp_1)
          LIMIT 5000
        `;
        conn.query(query, async (err, results) => {
          if (err) {
            console.error("Error executing query:", err);
            conn.release();
            reject(err);
            return;
          }
          conn.query
          resolve("initial insert into bot.web_variant table");
          conn.release();
          console.log();
        });
        db_pool.releaseConnection(conn);
      });
    });
  }

  export async function fetchTwentyBotTable(db: Pool) {
    return new Promise((resolve: (value: any[]) => void, reject) => {
        db.getConnection((err, conn) => {
          if (err) {
            console.error("Error acquiring connection from pool:", err);
            reject(err);
            return;
          }
          const query = `
            SELECT *
            FROM bot.test_temp_1
            WHERE status = 'TODO'
            LIMIT 20
          `;
          conn.query(query, async (err, results) => {
            if (err) {
              console.error("Error executing query:", err);
              conn.release();
              reject(err);
              return;
            }
            const processedIdSites = ([...results as any[]]).map(result => result.idsitehsr)
            resolve(processedIdSites);
            conn.release();
            console.log();
          });
          db.releaseConnection(conn);
        });
      });
  }

  export async function acknowledgeIdsite(db_pool: Pool, idsitehsr: number): Promise<any> {
    return new Promise((resolve, reject) => {
      db_pool.getConnection((err, conn) => {
        if (err) {
          console.error("Error acquiring connection from pool:", err);
          reject(err);
          return [];
        }
        const query = `
          UPDATE bot.test_temp_1
          SET status = 'QUEUED'
          WHERE idsitehsr = ${idsitehsr}
        `;
        conn.query(query, async (err, results) => {
          if (err) {
            console.error("Error executing query:", err);
            conn.release();
            reject(err);
            return;
          }
          const processedIdSites = ([...results as any[]]).map(result => result.idsite) as any[]
          resolve(processedIdSites);
          conn.release();
          console.log();
          return processedIdSites;
        });
        db_pool.releaseConnection(conn);
      });
    });
    }

  export async function markSiteHsrAsProcessed(db_pool: Pool, idsitehsr: number): Promise<any> {
    return new Promise((resolve, reject) => {
      db_pool.getConnection((err, conn) => {
        if (err) {
          console.error("Error acquiring connection from pool:", err);
          reject(err);
          return [];
        }
        const query = `
          UPDATE bot.test_temp_1
          SET status = 'PROCESSED'
          WHERE idsitehsr = ${idsitehsr}
        `;
        conn.query(query, async (err, results) => {
          if (err) {
            console.error("Error executing query:", err);
            conn.release();
            reject(err);
            return;
          }
          const processedIdSites = ([...results as any[]]).map(result => result.idsite) as any[]
          resolve(processedIdSites);
          conn.release();
          console.log();
          return processedIdSites;
        });
        db_pool.releaseConnection(conn);
      });
    });
    }