package NewPackage {

    part def Engine;

    part outer1 : OUTER1;

    part def OuterPart1 {

        part inner1 : INNER1;

        part def InnerPart1 {

        }
    }

    part def OuterPart2 {
        
        part def InnerPart2 {

        }

        part inner2 : INNER2;
    }

    part outer2: OUTER2;
}

package NewPackage2 {

    part test : TEST;
}