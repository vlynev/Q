<?php
/**
 * @module Websites
 */
/**
 * Class representing 'Bio' rows in the 'Websites' database
 * You can create an object of this class either to
 * access its non-static methods, or to actually
 * represent a bio row in the Websites database.
 *
 * @class Websites_Bio
 * @extends Base_Websites_Bio
 */
class Websites_Bio extends Base_Websites_Bio
{
	/**
	 * The setUp() method is called the first time
	 * an object of this class is constructed.
	 * @method setUp
	 */
	function setUp()
	{
		parent::setUp();
		// INSERT YOUR CODE HERE
		// e.g. $this->hasMany(...) and stuff like that.
	}

	/* 
	 * Add any Websites_Bio methods here, whether public or not
	 * If file 'Bio.php.inc' exists, its content is included
	 * * * */

	/* * * */
	/**
	 * Implements the __set_state method, so it can work with
	 * with var_export and be re-imported successfully.
	 * @method __set_state
	 * @param {array} $array
	 * @return {Websites_Bio} Class instance
	 */
	static function __set_state(array $array) {
		$result = new Websites_Bio();
		foreach($array as $k => $v)
			$result->$k = $v;
		return $result;
	}
};