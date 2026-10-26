extends CharacterBody2D

const SPEED := 60.0

var facing := "down"
var map_min := Vector2.ZERO
var map_max := Vector2(480, 272)

@onready var anim: AnimatedSprite2D = $AnimatedSprite2D
@onready var cam: Camera2D = $Camera2D

func _ready() -> void:
	var ground := get_tree().current_scene.get_node("Ground") as TileMapLayer
	var rect := ground.get_used_rect()
	var ts := Vector2(ground.tile_set.tile_size)
	map_min = Vector2(rect.position) * ts
	map_max = Vector2(rect.end) * ts
	cam.limit_left = int(map_min.x)
	cam.limit_top = int(map_min.y)
	cam.limit_right = int(map_max.x)
	cam.limit_bottom = int(map_max.y)

func _physics_process(_delta: float) -> void:
	var dir := Input.get_vector("left", "right", "up", "down")
	velocity = dir * SPEED
	move_and_slide()
	position = position.clamp(map_min + Vector2(8, 8), map_max - Vector2(8, 8))

	if dir != Vector2.ZERO:
		if abs(dir.x) > abs(dir.y):
			facing = "right" if dir.x > 0 else "left"
		else:
			facing = "down" if dir.y > 0 else "up"
		anim.play("walk_" + facing)
	else:
		anim.animation = "walk_" + facing
		anim.stop()
		anim.frame = 0
