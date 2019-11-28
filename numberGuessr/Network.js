const MAX = 3;

function sigmoid(z) {
    let ret = []
    for(let i = 0; i < z.length; i++){
        ret[i] = 1.0/(1.0+Math.exp(-z[i]));
    }
    return ret;
}

class Network {

    // The list sizes contains the number of neurons in the respective layers. 
    constructor(sizes){
        
        this.num_layers = sizes.length;
        this.sizes_copy = sizes;
        this.sizes = sizes;
        this.biases = [];
        // Biases
        // [2,3,1] => [3,1]
        for(let i = 1; i < sizes.length; i++){
            this.biases[i-1] = new Array(sizes[i]);
            for(let j = 0; j < sizes[i]; j++){
                this.biases[i-1][j] = (Math.random() * MAX) - MAX;
            }
        }
        this.weights = [];
        // Weights
        // [2,3,1] => [[3,2],[1,3]]
        for(let i = 0; i < sizes.length - 1; i++){
            this.weights[i] = new Array(sizes[i+1]);
            for(let j = 0; j < sizes[i+1]; j++){
                this.weights[i][j] = new Array(sizes[i]);
                for(let k = 0; k < sizes[i]; k++){
                    this.weights[i][j][k] = (Math.random() * MAX) - MAX;
                }
            }
        }

    }

  
    draw(){
        // [2,3,1] => [[[x,y],[x,y]],[3],[1]]
        let posCircles = new Array(this.num_layers);

        // Drawing perceptrons
        let px = CANVAS_WIDTH/(this.num_layers * 2);
        let newpx = px
        strokeWeight(1);
        stroke(255);
        for(let i = 0; i < this.num_layers; i++){
            let py = CANVAS_HEIGHT/(this.sizes_copy[i] * 2);
            let newpy = py;
            // Keep position
            posCircles[i] = new Array(this.sizes_copy[i])
            
            for(let j = 0; j < this.sizes_copy[i]; j++){

                // Biases
                if (i>0){
                    let act = map(this.biases[i-1][j], -MAX, MAX, 0, 255);
                    fill(act);
                } else fill(255);
                
                // Circles
                let d = 40;
                if (this.sizes_copy[i]*d > CANVAS_HEIGHT){
                    d = CANVAS_HEIGHT/this.sizes_copy[i];
                    circle(newpx,newpy,d);
                } else {
                circle(newpx,newpy,d);
                }

                // Keep position
                posCircles[i][j] = {
                    x: newpx,
                    y: newpy,
                    d: d
                }

                newpy = newpy + 2*py;
            }
            newpx = newpx + 2*px;
        }

        // Drawing weights
        strokeWeight(2);
        for(let i = 1; i < this.num_layers; i++){
            for(let j = 0; j < this.sizes_copy[i]; j++){
                for(let k = 0; k < this.sizes_copy[i-1]; k++){
                   let act =  map(this.weights[i-1][j][k],
                            -MAX, MAX, 0, 255);
                    stroke(255, act);
                    line(posCircles[i][j].x, 
                        posCircles[i][j].y,
                        posCircles[i-1][k].x,
                        posCircles[i-1][k].y);                
                }
            }
        }
    }

}