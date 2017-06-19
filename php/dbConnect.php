<?php
    //open connection to mysql db
    $connection = mysqli_connect("localhost","u1183p12847_cafepos","hboict", "u1183p12847_cafe") or die("Error " . mysqli_error($connection));

    //fetch table rows from mysql db
    $sql = "select * from product";
    $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

    //create an array
    $emparray = array();
    while($row =mysqli_fetch_assoc($result))
    {
        $emparray[] = $row;
    }
    echo json_encode($emparray);

    <script type="text/javascript">
    var test = <?php echo json_encode($emparray, JSON_PRETTY_PRINT) ?>;
    console.log(test);
    </script>



    //close the db connection
    mysqli_close($connection);
?>