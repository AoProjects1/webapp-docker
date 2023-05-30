from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from os import environ
from flask_cors import CORS

rest_api_app = Flask(__name__)
CORS(rest_api_app)
rest_api_app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DB_URL')
db = SQLAlchemy(rest_api_app)

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64),unique=True, nullable=False)
    fullname = db.Column(db.String(80), nullable=False)
    gender = db.Column(db.String(8), nullable=False)
    email = db.Column(db.String(128), unique=True, nullable=False)
    password = db.Column(db.String(64), nullable=False)


    def json(self):
        return {'id': self.id,'username': self.username,'fullname': self.fullname,'gender': self.gender,'email': self.email, 'password': self.password}

db.create_all()

#create a test route
@rest_api_app.route('/test', methods=['GET'])
def test():
  return make_response(jsonify({'message': 'This is Accounts api'}), 200)


# create a user
@rest_api_app.route('/users', methods=['POST'])
def create_user():
  try:
    data = request.get_json()
    new_user = User(username=data['username'],fullname=data['fullname'], gender=data['gender'], email=data['email'], password=data['password'])
    user = User.query.filter_by(username=new_user.username).first()
    email = User.query.filter_by(email=new_user.email).first()
    if user:
      return make_response(jsonify({'message': 'Username already found'}), 404)
    if email:
      return make_response(jsonify({'message': 'Email already found'}), 404)
    db.session.add(new_user)
    db.session.commit()
    return make_response(jsonify({'message': 'User created'}), 201)
  except e:
    return make_response(jsonify({'message': 'error creating user'}), 500)

# get all users
@rest_api_app.route('/users', methods=['GET'])
def get_users():
  try:
    users = User.query.all()
    return make_response(jsonify([user.json() for user in users]), 200)
  except e:
    return make_response(jsonify({'message': 'error getting users'}), 500)

# get a user by username --------------------------------------------------------------
@rest_api_app.route('/users/<username>', methods=['GET'])
def get_user(username):
  try:
    user = User.query.filter_by(username=username).first()
    if user:
      return make_response(jsonify({'user': user.json()}), 200)
    return make_response(jsonify({'message': 'User does not exist'}), 404)
  except e:
    return make_response(jsonify({'message': 'error getting user'}), 500)
#---------------------------------------------------------------------------------





# update a user --------------------------------------------------------------
@rest_api_app.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
  try:
    user = User.query.filter_by(id=id).first()
    if user:
      data = request.get_json()
      user.username = data['username']
      user.fullname = data['fullname']
      user.age = data['age']
      user.gender = data['gender']
      user.email = data['email']
      db.session.commit()
      return make_response(jsonify({'message': 'user updated'}), 200)
    return make_response(jsonify({'message': 'user not found'}), 404)
  except e:
    return make_response(jsonify({'message': 'error updating user'}), 500)
#---------------------------------------------------------------------------------



# delete a user --------------------------------------------------------------
@rest_api_app.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
  try:
    user = User.query.filter_by(id=id).first()
    if user:
      db.session.delete(user)
      db.session.commit()
      return make_response(jsonify({'message': 'user deleted'}), 200)
    return make_response(jsonify({'message': 'user not found'}), 404)
  except e:
    return make_response(jsonify({'message': 'error deleting user'}), 500)
#---------------------------------------------------------------------------------
