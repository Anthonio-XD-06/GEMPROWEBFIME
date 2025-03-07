from flask import Flask, request, jsonify, session
from flask_session import Session
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3

app = Flask(__name__)
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

# Función para conectar a la base de datos
def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

# Función para crear la base de datos y las tablas (si no existen)
def create_tables():
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    ''')
    conn.execute('''
        CREATE TABLE IF NOT EXISTS tarjetas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_usuario INTEGER NOT NULL,
            numero TEXT NOT NULL,
            fecha_corte TEXT NOT NULL,
            monto REAL NOT NULL,
            FOREIGN KEY (id_usuario) REFERENCES usuarios (id)
        )
    ''')
    conn.execute('''
        CREATE TABLE IF NOT EXISTS compras (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_tarjeta INTEGER NOT NULL,
            monto REAL NOT NULL,
            plazo INTEGER NOT NULL,
            interes REAL NOT NULL,
            FOREIGN KEY (id_tarjeta) REFERENCES tarjetas (id)
        )
    ''')
    conn.commit()
    conn.close()

create_tables()






# Ruta para el inicio de sesión
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']
    conn = get_db_connection()
    usuario = conn.execute('SELECT * FROM usuarios WHERE email = ?', (email,)).fetchone()
    conn.close()
    if usuario and check_password_hash(usuario['password'], password):
        session['user_id'] = usuario['id']
        return jsonify({'message': 'Inicio de sesión exitoso'})
    else:
        return jsonify({'message': 'Credenciales incorrectas'}), 401

# Ruta para obtener el correo del usuario
@app.route('/get_email')
def get_email():
    if 'user_id' in session:
        conn = get_db_connection()
        usuario = conn.execute('SELECT * FROM usuarios WHERE id = ?', (session['user_id'],)).fetchone()
        conn.close()
        return jsonify({'email': usuario['email']})
    else:
        return jsonify({'message': 'No autorizado'}), 401

# Ruta para cerrar sesión
@app.route('/logout')
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'Sesión cerrada'})



# Ruta para obtener las tarjetas del usuario
@app.route('/get_tarjetas')
def get_tarjetas():
    if 'user_id' in session:
        conn = get_db_connection()
        tarjetas = conn.execute('SELECT * FROM tarjetas WHERE id_usuario = ?', (session['user_id'],)).fetchall()
        conn.close()
        return jsonify([dict(tarjeta) for tarjeta in tarjetas])
    else:
        return jsonify({'message': 'No autorizado'}), 401

# Ruta para agregar una tarjeta
@app.route('/agregar_tarjeta', methods=['POST'])
def agregar_tarjeta():
    if 'user_id' in session:
        data = request.get_json()
        numero = data['numero']
        fecha_corte = data['fecha_corte']
        monto = data['monto']
        conn = get_db_connection()
        conn.execute('INSERT INTO tarjetas (id_usuario, numero, fecha_corte, monto) VALUES (?, ?, ?, ?)',
                     (session['user_id'], numero, fecha_corte, monto))
        conn.commit()
        conn.close()
        return jsonify({'message': 'Tarjeta agregada'})
    else:
        return jsonify({'message': 'No autorizado'}), 401
    






    # Ruta para registrar una compra
@app.route('/registrar_compra', methods=['POST'])
def registrar_compra():
    if 'user_id' in session:
        data = request.get_json()
        monto = data['monto']
        plazo = data['plazo']
        interes = data['interes']
        # Obtener el ID de la tarjeta (asumiendo que el usuario selecciona una tarjeta)
        id_tarjeta = 1  # Reemplazar con la lógica para obtener el ID de la tarjeta
        conn = get_db_connection()
        conn.execute('INSERT INTO compras (id_tarjeta, monto, plazo, interes) VALUES (?, ?, ?, ?)',
                     (id_tarjeta, monto, plazo, interes))
        conn.commit()
        conn.close()
        return jsonify({'message': 'Compra registrada'})
    else:
        return jsonify({'message': 'No autorizado'}), 401
    

    # Ruta para el simulador
@app.route('/simulador', methods=['POST'])
def simulador():
    data = request.get_json()
    monto = data['monto']
    plazo = data['plazo']
    interes = data['interes']
    pago_mensual = (monto * (interes / 100)) / (1 - (1 + (interes / 100))**-plazo)
    total_deuda = pago_mensual * plazo
    intereses = total_deuda - monto
    return jsonify({'pago_mensual': pago_mensual, 'total_deuda': total_deuda, 'intereses': intereses})




if __name__ == '__main__':
    app.run(debug=True)


    