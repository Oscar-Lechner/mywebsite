import pygame
import random
import math

pygame.init()

screen_width, screen_height = 800, 800
screen = pygame.display.set_mode((screen_width, screen_height))
background = pygame.image.load('oceanfloor.png')
background = pygame.transform.scale(background, (screen_width, screen_height))

#color map
letter_color_map = {
    pygame.K_a: (255, 255, 255),    
    pygame.K_b: (250, 25, 83),    
    pygame.K_c: (250, 87, 25), 
    pygame.K_d: (250, 46, 24),
    pygame.K_e: (250, 25, 218),
    pygame.K_f: (250, 126, 25),
    pygame.K_g: (250, 196, 25),
    pygame.K_h: (247, 250, 25),
    pygame.K_i: (250, 225, 26),
    pygame.K_j: (250, 169, 25),
    pygame.K_k: (152, 250, 25),
    pygame.K_l: (25, 250, 76),
    pygame.K_m: (25, 250, 229),
    pygame.K_n: (26, 250, 152),
    pygame.K_o: (56, 250, 25),
    pygame.K_p: (25, 198, 250),
    pygame.K_q: (30, 107, 250),
    pygame.K_r: (94, 30, 250),
    pygame.K_s: (29, 35, 250),
    pygame.K_t: (30, 176, 250),
    pygame.K_u: (166, 30, 250),
    pygame.K_v: (139, 130, 250),
    pygame.K_w: (217, 130, 250),
    pygame.K_x: (177, 129, 249),
    pygame.K_y: (130, 159, 250),
    pygame.K_z: (0, 0, 0),   
    
}
lifespan_var = random.randint(1000, 2000)
#fish class
class Fish(pygame.sprite.Sprite):
    def __init__(self, x, y, color=(255, 255, 255), lifespan=lifespan_var):
        super(Fish, self).__init__()
        self.image = pygame.image.load('fishnew.png')
        self.image = pygame.transform.scale(self.image, (100, 100))
        
        flip_horizontally = random.choice([True, False])
        self.image = pygame.transform.flip(self.image, flip_horizontally, False)

        self.image.fill(color, None, pygame.BLEND_RGBA_MULT)

        self.rect = self.image.get_rect()
        self.rect.x = x
        self.rect.y = y

        self.velocity = random.randint(1, 2)
        self.direction = random.choice(['left', 'right', 'up', 'down'])

        self.lifespan = lifespan

    def update(self):
        if self.direction == 'right':
            self.rect.x += self.velocity
        elif self.direction == 'left':
            self.rect.x -= self.velocity
        elif self.direction == 'up':
            self.rect.y -= self.velocity
        elif self.direction == 'down':
            self.rect.y += self.velocity

        
        if self.rect.right >= screen_width or self.rect.left <= 0:
            self.direction = 'right' if self.direction == 'left' else 'left'
        if self.rect.bottom >= screen_height or self.rect.top <= 0:
            self.direction = 'up' if self.direction == 'down' else 'down'


        self.lifespan -= 1

        if self.lifespan <= 0:
            self.kill()
        

# new fish at random location
def spawn_fish(color):
    x = random.randint(0, screen_width - 100)
    y = random.randint(0, screen_height - 100)
    new_fish = Fish(x, y, color=color)
    all_sprites.add(new_fish)


# calling
all_sprites = pygame.sprite.Group()

# actual game loop
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.KEYDOWN:
            if event.key in letter_color_map:
                color = letter_color_map[event.key]
                spawn_fish(color)
            

    
    all_sprites.update()

    
    screen.fill((0, 0, 0))
    screen.blit(background, (0, 0))

    
    all_sprites.draw(screen)

    
    pygame.display.update()


pygame.quit()


#apply tint to fish based on keyboard letter input (long if statement or better idk)
#make the fish move better?

