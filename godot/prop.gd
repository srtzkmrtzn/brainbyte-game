@tool
extends Node2D

@export var prop_texture: Texture2D:
	set(value):
		prop_texture = value
		_update()

## Laki ng collision. (0, 0) = walang collision
@export var collision_size: Vector2 = Vector2.ZERO:
	set(value):
		collision_size = value
		_update()

func _ready() -> void:
	_update()

func _update() -> void:
	if not is_node_ready():
		return
	var sprite: Sprite2D = $Sprite2D
	sprite.texture = prop_texture
	if prop_texture:
		sprite.offset = Vector2(0, -prop_texture.get_size().y / 2.0)
	var col: CollisionShape2D = $StaticBody2D/CollisionShape2D
	if collision_size == Vector2.ZERO:
		col.disabled = true
		return
	col.disabled = false
	var shape := RectangleShape2D.new()
	shape.size = collision_size
	col.shape = shape
	col.position = Vector2(0, -collision_size.y / 2.0)
