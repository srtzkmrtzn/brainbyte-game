extends Node2D

func _ready() -> void:
	if not OS.has_feature("web"):
		return
	var saved = JavaScriptBridge.eval("localStorage.getItem('bb_return')")
	if saved == null or str(saved) == "":
		return
	var parts := str(saved).split(",")
	if parts.size() != 2:
		return
	var player: Node2D = $Object/Player
	player.global_position = Vector2(float(parts[0]), float(parts[1]))
	player.get_node("Camera2D").reset_smoothing()  # no camera pan from spawn
