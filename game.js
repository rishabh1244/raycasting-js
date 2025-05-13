class game {
    constructor(x, y, map) {
        this.x = x;
        this.y = y;
        this.control = new Controls();
        this.angle = 0;

        this.hasPrinted = false;

        this.map = map;
        this.int_data = []


    }

    render(ctx, canvas, canvas2) {


        ctx.beginPath();
        ctx.fillStyle = "red";

        ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
        ctx.fill()
        this.#movement(canvas);
        this.#ray(100, canvas, canvas2);
    }
    indexOfLowest(arr) {
        if (arr.length === 0) return -1; // handle empty array

        let minIndex = 0;

        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < arr[minIndex]) {
                minIndex = i;
            }
        }

        return minIndex;
    }


    #ray(count, canvas, canvas2) {

        const div_x = canvas.width / map[0].length;
        const div_y = canvas.height / map.length;

        let d_theta = 0.01;
        let ray_angle = this.angle - (count - 1) * d_theta / 2;


        for (let i = 0; i < count; i++) {
            let length = 3180;
            let endX = this.x + Math.cos(ray_angle) * length;
            let endY = this.y + Math.sin(ray_angle) * length;

            // Track the closest intersection for this ray
            let closestDist = Infinity;
            let closestPoint = null;
            let closestBlock = null;

            // Check vertical grid lines
            for (let x = 0; x < canvas.width; x += div_x) {
                let len = (x - this.x) / Math.cos(ray_angle);
                let y_int = this.y + len * Math.sin(ray_angle);

                if (len > 0) {

                    let dist = Math.sqrt((x - this.x) ** 2 + (y_int - this.y) ** 2);
                    if (dist < closestDist) {
                        for (let i = 0; i < this.map.length; i++) {
                            for (let j = 0; j < this.map[i].length; j++) {
                                if (this.map[i][j] == 1) {
                                    let x_start = j * div_x;
                                    let y_start = i * div_y;
                                    let x_end = x_start + div_x;
                                    let y_end = y_start + div_y;

                                    if (y_int >= y_start && y_int <= y_end && x >= x_start && x <= x_end) {
                                        closestDist = dist;
                                        closestPoint = { x: x, y: y_int };
                                        closestBlock = { x: x_start + div_x / 2, y: y_start + div_y / 2 };
                                        // this.#render_3d(dist, canvas2, ray_angle);

                                    }
                                }
                            }
                        }
                    }
                }
            }
            // Check horizontal grid lines
            for (let y = 0; y < canvas.height; y += div_y) {
                let len = (y - this.y) / Math.sin(ray_angle);
                let x_int = this.x + len * Math.cos(ray_angle);

                if (len > 0) {
                    let dist = Math.sqrt((x_int - this.x) ** 2 + (y - this.y) ** 2);
                    if (dist < closestDist) {
                        for (let i = 0; i < this.map.length; i++) {
                            for (let j = 0; j < this.map[i].length; j++) {
                                if (this.map[i][j] === 1) {
                                    let x_start = j * div_x;
                                    let y_start = i * div_y;
                                    let x_end = x_start + div_x;
                                    let y_end = y_start + div_y;

                                    if (x_int >= x_start && x_int <= x_end && y >= y_start && y <= y_end) {
                                        closestDist = dist;
                                        closestPoint = { x: x_int, y: y };
                                        closestBlock = { x: x_start + div_x / 2, y: y_start + div_y / 2 };

                                    }
                                }
                            }
                        }
                    }
                }
            }

            // Draw the ray only up to the intersection point if one was found
            if (closestPoint) {
                // Draw ray only to intersection point
                ctx.beginPath();
                ctx.strokeStyle = "green";
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(closestPoint.x, closestPoint.y);

                this.#render_3d(closestDist, canvas2, ray_angle, i, count);
                ctx.stroke();

            } else {
                // If no intersection, draw the full ray
                ctx.beginPath();
                ctx.strokeStyle = "green";
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(endX, endY);
                ctx.stroke();
            }

            ray_angle = ray_angle + d_theta;
        }
    }

    #render_3d(distance, canvas2, ray_angle, ray_angle_index, total_rays) {
        let delta_angle = this.angle - ray_angle;
        let new_distance = distance * Math.cos(delta_angle); 

        let stripWidth = canvas2.width / total_rays;

        let wallHeight = Math.min(canvas2.height, canvas2.height * 50 / new_distance);

        let maxDistance = 500;
        let brightness = Math.max(0, 255 - (new_distance / maxDistance) * 255);
        brightness = Math.floor(brightness);

        let x = ray_angle_index * stripWidth;

        ctx2.beginPath();
        ctx2.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
        ctx2.rect(x, (canvas2.height - wallHeight) / 2, stripWidth, wallHeight);
        ctx2.fill();
    }



    #movement() {
        const vel = 1;
        const turn = 0.05;

        if (this.control.up == true) {
            this.x = this.x + vel * Math.cos(this.angle)
            this.y = this.y + vel * Math.sin(this.angle)
        }

        if (this.control.down == true) {

            this.x = this.x - vel * Math.cos(this.angle)
            this.y = this.y - vel * Math.sin(this.angle)

        }

        if (this.control.left == true) {
            this.angle = this.angle - turn;

        }

        if (this.control.right == true) {
            this.angle = this.angle + turn;
        }
    }





}

