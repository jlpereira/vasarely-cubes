import {
  BoxGeometry,
  Color,
  MeshBasicMaterial,
  Mesh,
  Float32BufferAttribute 
} from 'three'

export function createCube ({ size, x, y, z }) {
  const piece = new BoxGeometry(size, size, size).toNonIndexed();
  const material = new MeshBasicMaterial({ vertexColors: true });
  const positionAttribute = piece.getAttribute('position');
  const colors = [];
  const color = new Color();

  for (let i = 0; i < positionAttribute.count; i += 6) {

    color.setHex(0xffffff * Math.random());

    colors.push(color.r, color.g, color.b);
    colors.push(color.r, color.g, color.b);
    colors.push(color.r, color.g, color.b);

    colors.push(color.r, color.g, color.b);
    colors.push(color.r, color.g, color.b);
    colors.push(color.r, color.g, color.b);
  } 

  piece.setAttribute('color', new Float32BufferAttribute(colors, 3));

  const cube = new Mesh(piece, material);

  cube.position.x =  x
  cube.position.y =  y
  cube.position.z =  z

  return cube
}

export function createGroupCube ({ cubeSize, x, y, z, size }) {
  const cubes = []

  for (let i = 0; i < size; i++) {
    const zPos = z + (cubeSize * i)

    for (let j = 0; j < size; j++) {
      const xPos = x + (cubeSize * j)

      for (let k = 0; k < size; k++) {
        const yPos = y + (cubeSize * k)

        cubes.push(createCube(
          { 
            size: cubeSize,
            y: yPos, 
            x: xPos, 
            z: zPos
          })
        )
      }
    }
  }
  
  return cubes
}
