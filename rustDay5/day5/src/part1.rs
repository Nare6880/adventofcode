use std::fs::read_to_string;
fn get_input_as_vec() -> Vec<String>{
    let mut result = Vec::new();
    for line in read_to_string("input.txt").unwrap().lines() {
        let temp_line = line.to_string().replace("\r","");
        if temp_line != ""{
            result.push(temp_line.replace("\n",""));
        }
        
    }
    return result;
}
fn get_seeds_arr(seed_line: &String) -> Vec<i64>{
    let mut result:Vec<i64> = Vec::new();
    let seeds: Vec<&str> = seed_line.split(":").collect();
    for seed in seeds.get(1).unwrap().split(" "){
        if seed != ""{
            result.push(seed.parse::<i64>().unwrap());
        }
        
    }
    result.sort();
    return result;
}
fn get_mappings(lines_arr: Vec<String>) -> Vec<Vec<Vec<i64>>>{
    let mut result:Vec<Vec<Vec<i64>>> = Vec::new();
    for line in lines_arr{
        if line.find(":")!= None{
            result.push([].to_vec())
        }
        else{
            let line_arr:Vec<&str> = line.split(" ").collect();
            let temp_arr:Vec<i64> = line_arr.into_iter().map(|x| x.parse::<i64>().unwrap()).collect(); 
            let last_index = result.len()-1;  
            result[last_index].push(temp_arr);
        }
    }
    return result;
}
fn get_mapped_seed(seed:i64, mappings:&Vec<Vec<Vec<i64>>>)-> i64{
    let mut result:i64 = seed;
    for mapping in mappings{
        for map in mapping{
            if result >= map[1] && result <= map[1] + map[2]-1 {
                result = result-map[1]+ (map[0]);
                break;
            }
        }
    }
    return result;
}
pub fn part1(){
    let mut lines_arr:Vec<String> = get_input_as_vec();
    let seeds:Vec<i64> = get_seeds_arr(&lines_arr.remove(0));
    let mappings:Vec<Vec<Vec<i64>>> = get_mappings(lines_arr);
    let min = seeds.into_iter()
                        .map(|seed| { 
                            return get_mapped_seed(seed, &mappings)
                        })
                        .min().unwrap();
    println!("Part 1: {}",min)
}
