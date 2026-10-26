@tool
extends Node2D

@export var house_texture: Texture2D:
	set(value):
		house_texture = value
		_update()

@export var wall_height: int = 28:
	set(value):
		wall_height = value
		_update()

## Which question level this house opens
@export var level_to_open: int = 1

var _entered := false

func _ready() -> void:
	_update()
	if not Engine.is_editor_hint():
		_make_door()

func _make_door() -> void:
	var area := Area2D.new()
	var cs := CollisionShape2D.new()
	var rs := RectangleShape2D.new()
	rs.size = Vector2(16, 10)
	cs.shape = rs
	area.position = Vector2(0, 6)   # just below the house base
	area.add_child(cs)
	add_child(area)
	area.body_entered.connect(_on_body_entered)

func _on_body_entered(body: Node2D) -> void:
	if _entered or not body is CharacterBody2D:
		return
	_entered = true
	var url := "main.html?level=%d" % level_to_open
	if OS.has_feature("web"):
		JavaScriptBridge.eval("window.location.href = '%s'" % url)
	else:
		print("Would open: ", url)   # works only in the web export

func _update() -> void:
	if not is_node_ready():
		return
	var sprite: Sprite2D = $Sprite2D
	sprite.texture = house_texture
	if house_texture == null:
		return
	var size := house_texture.get_size()
	sprite.offset = Vector2(0, -size.y / 2.0)
	var shape := RectangleShape2D.new()
	shape.size = Vector2(size.x - 8, wall_height)
	var col: CollisionShape2D = $StaticBody2D/CollisionShape2D
	col.shape = shape
	col.position = Vector2(0, -wall_height / 2.0)
