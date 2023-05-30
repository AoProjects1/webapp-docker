from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from os import environ
from flask_cors import CORS

rest_api_app = Flask(__name__)
CORS(rest_api_app)
rest_api_app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DB_URL')
db = SQLAlchemy(rest_api_app)

class Item(db.Model):
    __tablename__ = 'items'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(96), nullable=False)
    type = db.Column(db.String(32), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    desc = db.Column(db.String(256), nullable=False)
    discount = db.Column(db.Integer, nullable=False)
    img = db.Column(db.String(128), nullable=False)


    def json(self):
        return {'id': self.id,'name': self.name,'type': self.type,'price': self.price,'desc': self.desc, 'discount': self.discount, 'img': self.img}

db.create_all()

#create a test route
@rest_api_app.route('/test', methods=['GET'])
def test():
  return make_response(jsonify({'message': 'This is Inventory api'}), 200)


# create a item
@rest_api_app.route('/items', methods=['POST'])
def create_item():
  try:
    data = request.get_json()
    new_item = Item(name=data['name'], type=data['type'], price=data['price'], desc=data['desc'], discount=data['discount'], img=data['img'])
    db.session.add(new_item)
    db.session.commit()
    return make_response(jsonify({'message': 'item created'}), 201)
  except e:
    return make_response(jsonify({'message': 'error creating item'}), 500)

# get all items
@rest_api_app.route('/items', methods=['GET'])
def get_items():
  try:
    items = Item.query.all()
    return make_response(jsonify([item.json() for item in items]), 200)
  except e:
    return make_response(jsonify({'message': 'error getting items'}), 500)

# get a item by id
@rest_api_app.route('/items/<int:id>', methods=['GET'])
def get_item(id):
  try:
    item = Item.query.filter_by(id=id).first()
    if item:
      return make_response(jsonify({'item': item.json()}), 200)
    return make_response(jsonify({'message': 'item not found'}), 404)
  except e:
    return make_response(jsonify({'message': 'error getting item'}), 500)

# update a item
@rest_api_app.route('/items/<int:id>', methods=['PUT'])
def update_item(id):
  try:
    item = Item.query.filter_by(id=id).first()
    if item:
      data = request.get_json()
      item.name = data['name']
      item.type = data['type']
      item.price = data['price']
      item.desc = data['desc']
      item.discount = data['discount']
      item.img = data['img']
      db.session.commit()
      return make_response(jsonify({'message': 'item updated'}), 200)
    return make_response(jsonify({'message': 'item not found'}), 404)
  except e:
    return make_response(jsonify({'message': 'error updating item'}), 500)

# delete a item
@rest_api_app.route('/items/<int:id>', methods=['DELETE'])
def delete_item(id):
  try:
    item = Item.query.filter_by(id=id).first()
    if item:
      db.session.delete(item)
      db.session.commit()
      return make_response(jsonify({'message': 'item deleted'}), 200)
    return make_response(jsonify({'message': 'item not found'}), 404)
  except e:
    return make_response(jsonify({'message': 'error deleting item'}), 500)