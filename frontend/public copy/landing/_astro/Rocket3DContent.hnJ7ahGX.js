// @ts-nocheck
import{j as e}from"./jsx-runtime.GRfx7fit.js";import{a as _,u as b,c as k,E as B,P as E,b as F,C as I}from"./Environment.C6Pp9JCr.js";import{r as i}from"./index.BA4EfN95.js";import{O as z,A as K,B as P,L as O,V as G,M as A}from"./three.module.DT35w0d6.js";import"./_commonjsHelpers.CqkleIqs.js";function T(a,o){const c=i.useRef(),[s]=i.useState(()=>o?o instanceof z?{current:o}:o:c),[n]=i.useState(()=>new K(void 0));i.useLayoutEffect(()=>{o&&(s.current=o instanceof z?o:o.current),n._root=s.current});const r=i.useRef({}),f=i.useMemo(()=>{const l={};return a.forEach(m=>Object.defineProperty(l,m.name,{enumerable:!0,get(){if(s.current)return r.current[m.name]||(r.current[m.name]=n.clipAction(m,s.current))},configurable:!0})),{ref:s,clips:a,actions:l,names:a.map(m=>m.name),mixer:n}},[a]);return _((l,m)=>n.update(m)),i.useEffect(()=>{const l=s.current;return()=>{r.current={},n.stopAllAction(),Object.values(f.actions).forEach(m=>{l&&n.uncacheAction(m,l)})}},[a]),f}const H=i.createContext(null);function V({iterations:a=10,ms:o=250,threshold:c=.75,step:s=.1,factor:n=.5,flipflops:r=1/0,bounds:f=x=>x>100?[60,100]:[40,60],onIncline:l,onDecline:m,onChange:g,onFallback:p,children:d}){const x=Math.pow(10,0),[t,w]=i.useState(()=>({fps:0,index:0,factor:n,flipped:0,refreshrate:0,fallback:!1,frames:[],averages:[],subscriptions:new Map,subscribe:v=>{const h=Symbol();return t.subscriptions.set(h,v.current),()=>void t.subscriptions.delete(h)}}));let y=0;return _(()=>{const{frames:v,averages:h}=t;if(!t.fallback&&h.length<a){v.push(performance.now());const S=v[v.length-1]-v[0];if(S>=o){if(t.fps=Math.round(v.length/S*1e3*x)/x,t.refreshrate=Math.max(t.refreshrate,t.fps),h[t.index++%a]=t.fps,h.length===a){const[N,D]=f(t.refreshrate),q=h.filter(u=>u>=D),L=h.filter(u=>u<N);q.length>a*c&&(t.factor=Math.min(1,t.factor+s),t.flipped++,l&&l(t),t.subscriptions.forEach(u=>u.onIncline&&u.onIncline(t))),L.length>a*c&&(t.factor=Math.max(0,t.factor-s),t.flipped++,m&&m(t),t.subscriptions.forEach(u=>u.onDecline&&u.onDecline(t))),y!==t.factor&&(y=t.factor,g&&g(t),t.subscriptions.forEach(u=>u.onChange&&u.onChange(t))),t.flipped>r&&!t.fallback&&(t.fallback=!0,p&&p(t),t.subscriptions.forEach(u=>u.onFallback&&u.onFallback(t))),t.averages=[]}t.frames=[]}}}),i.createElement(H.Provider,{value:t},d)}const j=`varying vec2 v_texcoord;
varying vec3 v_normal;
varying vec3 v_position;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  v_normal = normal;
  v_texcoord = uv;
  v_position = modelPosition.xyz;
}`,W=`varying vec2 v_texcoord;
uniform bool uHighDetails;

// larger values result in smaller stars (should be 5000 on 4k monitor)
uniform float uStarfieldStarSize;
// larger values result in less stars (should be 17 on 4k monitor)
uniform float uStarfieldStarAmount;

float map(float value, float inMin, float inMax, float outMin, float outMax) {
  return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
}

//----------------------------------------------------------------------
// Fractal Nebula
//----------------------------------------------------------------------

vec3 mod289(vec3 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289(vec2 x) 
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) 
{
  return mod289(((x*34.0)+1.0)*x);
}

// Simplex noise 
// https://github.com/ashima/webgl-noise 
// Copyright (C) 2011 Ashima Arts. All rights reserved.
float snoise(vec2 v)
  {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                     -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
// First corner
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);

// Other corners
  vec2 i1;
  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0
  //i1.y = 1.0 - i1.x;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  // x0 = x0 - 0.0 + 0.0 * C.xx ;
  // x1 = x0 - i1 + 1.0 * C.xx ;
  // x2 = x0 - 1.0 + 2.0 * C.xx ;
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

// Permutations
  i = mod289(i); // Avoid truncation effects in permutation
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
		+ i.x + vec3(0.0, i1.x, 1.0 ));

  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;

// Gradients: 41 points uniformly over a line, mapped onto a diamond.
// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

// Normalise gradients implicitly by scaling m
// Approximation of: m *= inversesqrt( a0*a0 + h*h );
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );

// Compute final noise value at P
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}


vec3 hsv2rgb(vec3 c)
{
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}


// Simple fractal noise
// persistence - A multiplier that determines how quickly the amplitudes diminish for 
// each successive octave.
// lacunarity - A multiplier that determines how quickly the frequency increases for 
// each successive octave.
float fractalNoise(in vec2 coord, in float persistence, in float lacunarity, int octaves)
{    
  float n = 0.;
  float frequency = 1.;
  float amplitude = 1.;
  for (int o = 0; o < octaves; ++o)
  {
      n += amplitude * snoise(coord * frequency);
      amplitude *= persistence;
      frequency *= lacunarity;
  }
  return n;
}

vec3 fractalNebula(in vec2 uv, vec3 color, float transparency)
{

  float n = fractalNoise((uv * 1.5), .6, 3., 5);


	float mask = fractalNoise((uv * 0.3) + 0.5, .6, 3., 5);

	n = min(n , mask);

  // mask out nebula around uv seam
  // float leftSide = abs(uv.x);
  // leftSide = pow(leftSide, 8.);
  // leftSide = map(leftSide, 0.0, 0.005, 0.0, 1.0);

  // float rightSide = abs(1.0 - uv.x);
  // rightSide = pow(rightSide, 8.);
  // rightSide = map(rightSide, 0.0, 0.005, 0.0, 1.0);

  // float d = leftSide + rightSide;


  // d = d;

  // n = max(d , n);

  return n * color * transparency;
  // return rightSide;
}

//----------------------------------------------------------------------
// Starfield
//----------------------------------------------------------------------

vec3 nrand3(vec2 co)
{
	vec3 a = fract(cos(co.x*8.3e-3 + co.y) * vec3(1.3e5, 4.7e5, 2.9e5));
	vec3 b = fract(sin(co.x*0.3e-3 + co.y) * vec3(8.1e5, 1.0e5, 0.1e5));
	vec3 c = mix(a, b, 0.5);
	return c;
}

vec4 starLayer(vec2 p)
{
	vec2 seed = p.xy;
	seed = floor(seed *  uStarfieldStarSize);
	vec3 rnd = nrand3(seed);
	vec4 col = vec4(pow(rnd.y, uStarfieldStarAmount));
	col.xyz *= sin((rnd.x + rnd.x)) * 0.5;
	float sum = col.x + col.y + col.z;

	vec3 colRand = nrand3(seed + 5.0);
	colRand = colRand * 0.5 + 0.5;

	return vec4(sum * colRand.x, sum * colRand.y, sum * colRand.z, 1.0);
}

//----------------------------------------------------------------------
// Voronoi based large stars
//----------------------------------------------------------------------

// voronoi noise based on https://www.shadertoy.com/view/MslGD8
vec2 hash( vec2 p )
{
    p = vec2(dot(p,vec2(127.1,311.7)),
             dot(p,vec2(269.5,183.3)));
    return fract(sin(p)*18.5453);
}

// return distance, and cell id
vec2 voronoi( in vec2 x )
{
    vec2 n = floor( x );
    vec2 f = fract( x );

	vec3 m = vec3( 8.0 );
    for( int j=-1; j<=1; j++ )
    for( int i=-1; i<=1; i++ )
    {
        vec2  g = vec2( float(i), float(j) );
        vec2  o = hash( n + g );
	    vec2  r = g - f + sin(6.2831*o);
		float d = dot( r, r );
        if(d < m.x)
            m = vec3( d, o );
    }

    return vec2( sqrt(m.x), m.y+m.z );
}

vec3 largeStars(vec2 uv) {
  // computer voronoi patterm
  vec2 c = voronoi(100.0 * uv);
  // colorize
  vec3 col = 1. - vec3(smoothstep( 0.005, 0.03, c.x));
  // color variation
  col *= 0.5 + 0.5*cos(c.y*6.2831 + vec3(1.0,1.2,1.4));
  return col;
}

void main()
{
	// Normalized pixel coordinates (from 0 to 1)
	vec2 uv = v_texcoord;

	vec3 color = vec3(0.0);
	color += starLayer(uv).xyz;
  color = clamp(color, 0.0, 1.0);


  if(uHighDetails) {
    vec3 nebulaColor1 = hsv2rgb(vec3(.7, 0.73, .89));
    vec3 nebulaColor2 = hsv2rgb(vec3(.5, 1., .25));
    color += fractalNebula(uv * 10.0 + vec2(.1, .1), nebulaColor1, 0.5);
    color += fractalNebula(uv * 10.0 + vec2(0., .2), nebulaColor2, .5);

    color += largeStars(uv);
  }


  color = clamp(color, 0.0, 1.0);
	
	gl_FragColor = vec4(color, 1.0);
}`;class U{constructor(o){if(o<0)throw new RangeError("Invalid size.");this.buffer=[],this.size=o,this.pos=0}getSize(){return this.size}getBufferLength(){return this.buffer.length}add(...o){o.forEach(c=>{this.buffer[this.pos]=c,this.pos=(this.pos+1)%this.size})}get(o){if(o<0&&(o+=this.buffer.length),!(o<0||o>this.buffer.length))return this.buffer.length<this.size?this.buffer[o]:this.buffer[(this.pos+o)%this.size]}}const C=new U(60);function M(){const{innerWidth:a,innerHeight:o}=window;return{width:a,height:o}}function $(){const[a,o]=i.useState(M());return i.useEffect(()=>{function c(){o(M())}return window.addEventListener("resize",c),()=>window.removeEventListener("resize",c)},[]),a}function J(){const a=i.useRef(),{height:o,width:c}=$(),s=i.useRef(!1),n=i.useRef(0);function r(f){C.add(f);let l=0;for(let g=0;g<C.getBufferLength();g++)l+=C.get(g)||0;const m=l/C.getBufferLength();n.current+=f,n.current>.05&&(m>.02?s.current=!1:s.current=!0)}return _((f,l)=>{r(l),a.current&&(a.current.uniforms.uHighDetails={value:s.current},a.current.uniforms.uStarfieldStarSize={value:Math.min(Math.max(c*2,3e3),8e3)},a.current.uniforms.uStarfieldStarAmount={value:27})}),e.jsxs(e.Fragment,{children:[e.jsxs("mesh",{position:[0,0,0],scale:300,rotation:[0,0,0],children:[e.jsx("sphereGeometry",{args:[1,64,64]}),e.jsx("shaderMaterial",{fragmentShader:W,vertexShader:j,side:P,ref:a})]}),e.jsx(V,{onIncline:()=>s.current=!0,onDecline:()=>s.current=!1})]})}const Q=`varying vec2 v_texcoord;
uniform float uTime;
varying vec3 v_normal;
varying vec3 v_position;

float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

void main()
{
	vec3 color = vec3(0.3, 0.3, 0.8);

	vec3 cameraDir = normalize(cameraPosition - v_position);
	float cameraAngle = dot(cameraDir, normalize(v_normal));
	float atmosphereStrength = 1. - cameraAngle;

	color = color * atmosphereStrength;

	gl_FragColor = vec4(color, atmosphereStrength / 2.0);
}`;function X(a){const{nodes:o,materials:c}=b("/models/earth/earth.glb");return e.jsx(e.Fragment,{children:e.jsxs("group",{position:[0,0,0],scale:100,children:[e.jsx("group",{...a,dispose:null,children:e.jsx("mesh",{position:[0,0,0],geometry:o.Sphere.geometry,material:c.earth})}),e.jsxs("mesh",{scale:1.002,children:[e.jsx("sphereGeometry",{args:[1,64,64]}),e.jsx("shaderMaterial",{fragmentShader:Q,vertexShader:j,transparent:!0})]})]})})}b.preload("/models/earth/earth.glb");const Y=`varying vec2 v_texcoord;
uniform float uTime;

//----------------------------------------------------------------------
// Fractal Nebula
//----------------------------------------------------------------------

vec3 mod289(vec3 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289(vec2 x) 
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) 
{
  return mod289(((x*34.0)+1.0)*x);
}

// Simplex noise 
// https://github.com/ashima/webgl-noise 
// Copyright (C) 2011 Ashima Arts. All rights reserved.
float snoise(vec2 v)
  {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                     -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
// First corner
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);

// Other corners
  vec2 i1;
  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0
  //i1.y = 1.0 - i1.x;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  // x0 = x0 - 0.0 + 0.0 * C.xx ;
  // x1 = x0 - i1 + 1.0 * C.xx ;
  // x2 = x0 - 1.0 + 2.0 * C.xx ;
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

// Permutations
  i = mod289(i); // Avoid truncation effects in permutation
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
		+ i.x + vec3(0.0, i1.x, 1.0 ));

  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;

// Gradients: 41 points uniformly over a line, mapped onto a diamond.
// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

// Normalise gradients implicitly by scaling m
// Approximation of: m *= inversesqrt( a0*a0 + h*h );
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );

// Compute final noise value at P
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}


vec3 hsv2rgb(vec3 c)
{
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}


// Simple fractal noise
// persistence - A multiplier that determines how quickly the amplitudes diminish for 
// each successive octave.
// lacunarity - A multiplier that determines how quickly the frequency increases for 
// each successive octave.
float fractalNoise(in vec2 coord, in float persistence, in float lacunarity)
{    
  float n = 0.;
  float frequency = 1.;
  float amplitude = 1.;

  n += amplitude * snoise(coord * frequency);
  amplitude *= persistence;
  frequency *= lacunarity;

  return n;
}

vec3 fractalNebula(in vec2 uv, vec3 color, float transparency)
{

  float n = fractalNoise((uv * 1.5), .6, 3.);
	float mask = fractalNoise((uv * 0.3) + 0.5, .6, 3.);

	n = min(n , mask);
  return n * color * transparency;
}

void main()
{
	// Normalized pixel coordinates (from 0 to 1)
	vec2 uv = v_texcoord;

	vec3 color = vec3(0.0);

	vec3 nebulaColor1 = hsv2rgb(vec3(.7, 0.73, .89));
	vec3 nebulaColor2 = hsv2rgb(vec3(.5, 1., .25));
	color += fractalNebula(uv * 10.0 + vec2(.1, .1), nebulaColor1, 0.5);
	color += fractalNebula(uv * 10.0 + vec2(0., .2), nebulaColor2, .5);

  color = clamp(color, 0.0, 1.0);
	
	gl_FragColor = vec4(color, 1.0);
}`;
function Z(){const{scene:a}=k();return a.environmentIntensity=100,e.jsxs(e.Fragment,{children:[e.jsx("directionalLight",{position:[2.6,0,66],intensity:.5}),e.jsx(B,{backgroundIntensity:0,children:e.jsxs("mesh",{position:[0,0,0],scale:400,rotation:[0,0,0],children:[e.jsx("sphereGeometry",{args:[1,64,64]}),e.jsx("shaderMaterial",{fragmentShader:Y,vertexShader:j,side:P})]})})]})}
const R="/models/ariane5.glb";function ee(a){const o=i.useRef(),c=i.useRef(),s=i.useRef(),{nodes:n,materials:r,animations:f}=b(R),{actions:l}=T(f,o);o.current&&(o.current.frustumCulled=!1),i.useEffect(()=>{f.forEach(d=>{const x=l[d.name];x&&(x.clampWhenFinished=!0,x.loop=O,x.play(),x.timeScale=.8)})},[l,f]),_((d,x)=>{if(c.current?.rotateOnAxis(new G(0,1,0),x/150),!s.current)return;const t=d.pointer.x,w=d.pointer.y,y=s.current,v=.005,h=40;y.rotation.y=A.lerp(y.rotation.y,t*Math.PI/-h,v),y.rotation.x=A.lerp(y.rotation.x,w*Math.PI/h,v)});const{gl:m,scene:g,camera:p}=k();return i.useLayoutEffect(()=>void m.compile(g,p),[]),g.traverse(d=>d.frustumCulled=!1),e.jsx("group",{ref:o,...a,dispose:null,children:e.jsx("group",{name:"Scene",children:e.jsxs("group",{name:"rotationCenter",ref:c,children:[e.jsxs("group",{name:"ModelCenter",position:[-33.951,54.778,146.083],rotation:[.814,.72,-.234],scale:.209,children:[e.jsxs("group",{name:"common_payload_module",position:[54.124,13.877,-1.263],rotation:[-1.328,-.011,-3.004],scale:2.615,children:[e.jsx("mesh",{name:"mesh003",geometry:n.mesh003.geometry,material:r["off-white metal.001"]}),e.jsx("mesh",{name:"mesh003_1",geometry:n.mesh003_1.geometry,material:r["Aluminium.002"]}),e.jsx("mesh",{name:"mesh003_2",geometry:n.mesh003_2.geometry,material:r["white metal.003"]}),e.jsx("mesh",{name:"mesh003_3",geometry:n.mesh003_3.geometry,material:r["arianegroup logo.001"]})]}),e.jsxs("group",{name:"common_payload_module001",position:[54.124,13.877,-1.263],rotation:[1.814,.011,3.004],scale:2.615,children:[e.jsx("mesh",{name:"mesh002",geometry:n.mesh002.geometry,material:r["off-white metal.001"]}),e.jsx("mesh",{name:"mesh002_1",geometry:n.mesh002_1.geometry,material:r["Aluminium.002"]}),e.jsx("mesh",{name:"mesh002_2",geometry:n.mesh002_2.geometry,material:r["white metal.003"]}),e.jsx("mesh",{name:"mesh002_3",geometry:n.mesh002_3.geometry,material:r["arianegroup logo.001"]})]}),e.jsxs("group",{name:"EAP_P241",position:[-57.036,11.972,1.424],rotation:[1.814,.011,-1.708],scale:2.615,children:[e.jsx("mesh",{name:"Circle015",geometry:n.Circle015.geometry,material:r["black composite"]}),e.jsx("mesh",{name:"Circle015_1",geometry:n.Circle015_1.geometry,material:r["off-white metal"]}),e.jsx("mesh",{name:"Circle015_2",geometry:n.Circle015_2.geometry,material:r["cnes logo"]}),e.jsx("mesh",{name:"Circle015_3",geometry:n.Circle015_3.geometry,material:r["silver foil"]}),e.jsx("mesh",{name:"Circle015_4",geometry:n.Circle015_4.geometry,material:r["srb flags bottom"]}),e.jsx("mesh",{name:"Circle015_5",geometry:n.Circle015_5.geometry,material:r["ariane 5 SRB ESA logo"]}),e.jsx("mesh",{name:"Circle015_6",geometry:n.Circle015_6.geometry,material:r["srb flags top"]}),e.jsx("mesh",{name:"Circle015_7",geometry:n.Circle015_7.geometry,material:r.Bronze}),e.jsx("mesh",{name:"Circle015_8",geometry:n.Circle015_8.geometry,material:r.DarkMetal}),e.jsx("mesh",{name:"Circle015_9",geometry:n.Circle015_9.geometry,material:r["white metal"]}),e.jsx("mesh",{name:"Circle015_10",geometry:n.Circle015_10.geometry,material:r.Aluminium})]}),e.jsxs("group",{name:"EAP_P241001",position:[-53.712,6.212,24.815],rotation:[-1.328,-.011,-1.434],scale:2.615,children:[e.jsx("mesh",{name:"Circle044",geometry:n.Circle044.geometry,material:r["black composite"]}),e.jsx("mesh",{name:"Circle044_1",geometry:n.Circle044_1.geometry,material:r["off-white metal"]}),e.jsx("mesh",{name:"Circle044_2",geometry:n.Circle044_2.geometry,material:r["cnes logo"]}),e.jsx("mesh",{name:"Circle044_3",geometry:n.Circle044_3.geometry,material:r["silver foil"]}),e.jsx("mesh",{name:"Circle044_4",geometry:n.Circle044_4.geometry,material:r["srb flags bottom"]}),e.jsx("mesh",{name:"Circle044_5",geometry:n.Circle044_5.geometry,material:r["ariane 5 SRB ESA logo"]}),e.jsx("mesh",{name:"Circle044_6",geometry:n.Circle044_6.geometry,material:r["srb flags top"]}),e.jsx("mesh",{name:"Circle044_7",geometry:n.Circle044_7.geometry,material:r.Bronze}),e.jsx("mesh",{name:"Circle044_8",geometry:n.Circle044_8.geometry,material:r.DarkMetal}),e.jsx("mesh",{name:"Circle044_9",geometry:n.Circle044_9.geometry,material:r["white metal"]}),e.jsx("mesh",{name:"Circle044_10",geometry:n.Circle044_10.geometry,material:r.Aluminium})]}),e.jsxs("group",{name:"EPC_H173",position:[-52.914,9.199,12.796],rotation:[1.814,.011,-1.708],scale:2.615,children:[e.jsx("mesh",{name:"Circle003",geometry:n.Circle003.geometry,material:r["ariane 5 white foam.001"]}),e.jsx("mesh",{name:"Circle003_1",geometry:n.Circle003_1.geometry,material:r["off-white metal.001"]}),e.jsx("mesh",{name:"Circle003_2",geometry:n.Circle003_2.geometry,material:r["ariane blue light 1.001"]}),e.jsx("mesh",{name:"Circle003_3",geometry:n.Circle003_3.geometry,material:r["Aluminium.003"]}),e.jsx("mesh",{name:"Circle003_4",geometry:n.Circle003_4.geometry,material:r["DarkMetal.001"]}),e.jsx("mesh",{name:"Circle003_5",geometry:n.Circle003_5.geometry,material:r["vulcain bell.001"]}),e.jsx("mesh",{name:"Circle003_6",geometry:n.Circle003_6.geometry,material:r["white metal.002"]}),e.jsx("mesh",{name:"Circle003_7",geometry:n.Circle003_7.geometry,material:r["silver foil.001"]}),e.jsx("mesh",{name:"Circle003_8",geometry:n.Circle003_8.geometry,material:r["black composite.001"]}),e.jsx("mesh",{name:"Circle003_9",geometry:n.Circle003_9.geometry,material:r["ariane blue light 2.001"]}),e.jsx("mesh",{name:"Circle003_10",geometry:n.Circle003_10.geometry,material:r["Bronze.001"]})]}),e.jsxs("group",{name:"ESC-A",position:[1.609,11.582,5.635],rotation:[-1.328,-.011,-1.434],scale:2.615,children:[e.jsx("mesh",{name:"Circle002",geometry:n.Circle002.geometry,material:r["off-white metal.001"]}),e.jsx("mesh",{name:"Circle002_1",geometry:n.Circle002_1.geometry,material:r["Bronze.001"]}),e.jsx("mesh",{name:"Circle002_2",geometry:n.Circle002_2.geometry,material:r["ariane blue light 1.001"]}),e.jsx("mesh",{name:"Circle002_3",geometry:n.Circle002_3.geometry,material:r["Aluminium.003"]}),e.jsx("mesh",{name:"Circle002_4",geometry:n.Circle002_4.geometry,material:r["ariane blue light 2.001"]}),e.jsx("mesh",{name:"Circle002_5",geometry:n.Circle002_5.geometry,material:r["ariane blue dark.001"]})]})]}),e.jsx("group",{name:"CameraCenter",position:[0,71.943,135.081],ref:s,children:e.jsx(E,{name:"Camera_1",makeDefault:!0,far:450,near:1,fov:22.895,position:[0,-6.12,49.978],rotation:[.112,0,0]})})]})})})}b.preload(R);function ie(){const[a,o]=i.useState(document.visibilityState==="visible"),c=()=>{o(!1)},s=()=>{o(!0)};i.useEffect(()=>(window.addEventListener("blur",c),window.addEventListener("focus",s),()=>{window.removeEventListener("blur",c),window.removeEventListener("focus",s)}),[]);const n=i.useRef(null),r=F(n);return e.jsx("div",{ref:n,className:"backdrop-hue-rotate-15 z-0 w-full h-screen absolute bg-black",children:e.jsx("div",{className:"h-full w-full z-0",children:e.jsx("div",{className:"h-full w-full z-0 bg-black",children:e.jsxs(I,{shadows:!0,dpr:[1,2],frameloop:a&&r?"always":"never",children:[e.jsx(i.Suspense,{fallback:e.jsx(E,{name:"Camera",makeDefault:!0,far:450,near:1,fov:22.895,position:[2.608,66.727,185.059],rotation:[.112,0,0]}),children:e.jsx(ee,{})}),e.jsx(i.Suspense,{fallback:null,children:e.jsx(X,{})}),e.jsx(J,{}),e.jsx(Z,{})]})})})})}export{ie as default};
