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

## -1 = decoration (no door) | 0 = opens the main menu | >0 = first level of this building
@export var level_to_open: int = -1
## Questions in this building (3 normally, 5 for the last one)
@export var level_count: int = 3

var _entered := false
var _msg: Label = null

func _ready() -> void:
	_update()
	if not Engine.is_editor_hint() and level_to_open >= 0:
		_make_door()

func _make_door() -> void:
	var area := Area2D.new()
	var cs := CollisionShape2D.new()
	var rs := RectangleShape2D.new()
	rs.size = Vector2(16, 10)
	cs.shape = rs
	area.position = Vector2(0, 6)
	area.add_child(cs)
	add_child(area)
	area.body_entered.connect(_on_body_entered)

func _on_body_entered(body: Node2D) -> void:
	if _entered or not body is CharacterBody2D:
		return
	if level_to_open > 0 and not _is_unlocked():
		return
	_entered = true

	var url := "main.html"
	if level_to_open > 0:
		url = "main.html?level=%d" % level_to_open

	if OS.has_feature("web"):
		# remember where to put the player when they come back (just outside this door)
		var back := global_position + Vector2(0, 24)
		JavaScriptBridge.eval("localStorage.setItem('bb_return', '%d,%d')" % [back.x, back.y])
		JavaScriptBridge.eval("window.location.href = '%s'" % url)
	else:
		print("Would open: ", url)

# ---------- lock logic (reads the same save that script.js writes) ----------

func _get_progress() -> int:
	if not OS.has_feature("web"):
		return level_to_open  # editor testing: always unlocked
	var js := """
	(function () {
	  try {
	    var d = JSON.parse(localStorage.getItem('brainbyte_save_v1'));
	    var u = d.users[d.selectedUserId];
	    return u ? Number(u.currentLevel) : 1;
	  } catch (e) { return 1; }
	})()
	"""
	return int(JavaScriptBridge.eval(js, true))

func _is_unlocked() -> bool:
	var progress := _get_progress()
	if progress < level_to_open:
		_show_message("LOCKED\nFinish the previous house first")
		return false
	if progress >= level_to_open + level_count:
		_show_message("Already cleared!")
		return false
	return true

func _show_message(text: String) -> void:
	if _msg != null and is_instance_valid(_msg):
		return
	_msg = Label.new()
	_msg.text = text
	_msg.add_theme_font_size_override("font_size", 8)
	_msg.add_theme_color_override("font_outline_color", Color.BLACK)
	_msg.add_theme_constant_override("outline_size", 4)
	_msg.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	_msg.position = Vector2(-50, -wall_height - 40)
	_msg.size = Vector2(100, 20)
	_msg.z_index = 100
	add_child(_msg)
	get_tree().create_timer(2.0).timeout.connect(_msg.queue_free)

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
