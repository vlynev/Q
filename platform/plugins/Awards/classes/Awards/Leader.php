<?php
/**
 * @module Awards
 */
/**
 * Class representing 'Leader' rows in the 'Awards' database
 * You can create an object of this class either to
 * access its non-static methods, or to actually
 * represent a leader row in the Awards database.
 *
 * @class Awards_Leader
 * @extends Base_Awards_Leader
 */
class Awards_Leader extends Base_Awards_Leader
{
	/**
	 * The setUp() method is called the first time
	 * an object of this class is constructed.
	 * @method setUp
	 */
	function setUp()
	{
		parent::setUp();
	}

	/**
	 * Implements the __set_state method, so it can work with
	 * with var_export and be re-imported successfully.
	 * @method __set_state
	 * @param {array} $array
	 * @return {Awards_Leader} Class instance
	 */
	static function __set_state(array $array) {
		$result = new Awards_Leader();
		foreach($array as $k => $v)
			$result->$k = $v;
		return $result;
	}
};